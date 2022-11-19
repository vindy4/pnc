import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
  type: "service_account",
  projectId: "mttv-f0792",
  private_key_id: "1f636fe3e283fe476f00cb320d5fb7f8d4455b39",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdBry96BbdyTi5\ndW8lx4/+OZfS7qSABF0EWKLMZRdW8Tgx9pASuWwyxwrOP2hOoZLa0nMoyw8HsetT\nobTHPvfJPxOR7ya4dm++JXFFg4GDDJr1Eb08vOnHbYWyL+QEWh69ExfGVe/aOakI\ne36W2kfJF3W5bX1qMfFK1X7s+wGwYeFFJML48Q0JLZPFTGZw+XvI/g8tDFjtmE/8\nMdTu9tpKkjS3hjmE0RYr7aqltdDdk78dp85/jk6HQl2RxVbsNt9/kerhooyqTWMy\ncr1yf6PJJOi5K1meJqPY1THymdbnabxvnFBSZHmI5R69W780P4gC6IXhGQUbne4K\nb9vBXlFNAgMBAAECggEACAhG/o5KufM7G/5UpMgXWfFndMcquJzm7S8wVLUVg1sF\n46uX8koN4NZE4gjLgYoxhIQGlzjPGGoSsZp9MHWZUzzb99EV8ZJzynQ73eRv0Y/p\nghommSuVgdNDM+3QA73GzyeU31syA79QIdQlxS2xRY+vpyaUp12apctTmZrvAS8Y\n1AE2N/XwtZB6t5RtKRnjxShDCmwyBDwxrK4DVjOa5tiXZD4wAQQ9mU+Pe9iYRorU\nzAua22V3fvTV7ipqGy4ml1P7khoVgFOnWZV0UCmNWU0sByk+DF8DsPMu0BWB1Itr\nhJn3H9Mf0QZEEqb25MLdq0AfmmZ2eHDqAziuhF94uQKBgQDWH+nLomnCvtfvP2ky\nr33QWmYiO62Ew/TDlqBvF0PoK3tt43p1srmc0spc8IHJdXDoqE0BsuFodq0cfLl1\nrkVzudmmuJtmgL1rSavfXlzeG9Q7EkwQEXn9G/CezlMAUqj+UcWfDHQjU0M/LmUz\nCUsSuT582lODbJZZOYJffkcqpwKBgQC7vDZtrCpR/rxgIKotvnCjKnmcCYdromYZ\nJM4msGgtpnlML7bE47KY2BZSfNdYYxptWKRYYEaoFi2TsRtBAHdhJt79eNasaHVj\nXV4qiD+sv3r5QauanZtjcwdaeaBXqVYqVjvwwyfNyG04lsO5bSJlXWG7AR2YAR8J\nNr5AdyvG6wKBgA0MoNjyKvPdYZeJC8Y0/7vk5niLnoWK063fziM3DcJmc/08ccge\nfkVaa07CsYYvjBQBvb+uwSH2qZIk38CWQFFPMD6C3aWfjuus77aLL6mxlHuNH+mS\nxxZvz3g+JrzMTNRC84I/5gwJFP4Su8QietrHQ1GklJZb1cXWRWXAcmHdAoGBAK/Z\noPIiLpIXlsREVKP8mu17v+XVVzAPMquiuierXipEoaInn3/V+VkKL/6cSerVCdAb\nE/ZkWEriW1bYsrq0gR5TltS+9/cO8cZdkvMsJNjfk4Ufamqt7vu8p8qr2vHCAKAv\nnn3rj8FGWGiFcFikTW+9hOnyJZJYmoW67YLdHfh5AoGAdCMfApW7uPHA+ve9vF3N\ns4+e9ZwyLsTcHkxwdGtdNbFcENV+kZTOsv0zdPqA7inndl3H5+kws9xyUQJp9kWH\n+C0sgLTeZUfwpztQyYYquqCxA10agsjg1YT9fJ7HwoEEuf8kUe7s6KQwzN5TxFKR\nKBhZHvNKaGWNq05fgQ4bsqI=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-sv2xx@mttv-f0792.iam.gserviceaccount.com",
  client_id: "106139036913843751386",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sv2xx%40mttv-f0792.iam.gserviceaccount.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getMovies() {
  const moviesCol = collection(db, "Movies");
  const movieSnapshot = await getDocs(moviesCol);
  const movieList = movieSnapshot.docs.map((doc) => doc.data());
  console.log(movieList);
  return movieList;
}

async function setMovie(obj, collection) {
  // Add a new document with a generated id.
  await setDoc(doc(db, collection, obj.imdbId), obj);
}

export { getMovies, setMovie };
