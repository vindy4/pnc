import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup(props) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">OTT</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.value}
        onChange={(v) => {
          props.onChange(v);
        }}
      >
        <FormControlLabel value="Netflix" control={<Radio />} label="Netflix" />
        <FormControlLabel value="Amazon" control={<Radio />} label="Amazon" />
        <FormControlLabel
          value="Disney+HS"
          control={<Radio />}
          label="Disney+HS"
        />
        <FormControlLabel value="ZEE5" control={<Radio />} label="ZEE5" />
        <FormControlLabel value="HBOMAX" control={<Radio />} label="HBOMAX" />
        <FormControlLabel value="AppleTV" control={<Radio />} label="AppleTV" />
        <FormControlLabel
          value="Discovery+"
          control={<Radio />}
          label="Discovery+"
        />
        <FormControlLabel value="SonyLiv" control={<Radio />} label="SonyLiv" />
        <FormControlLabel value="HULU" control={<Radio />} label="HULU" />
        <FormControlLabel
          value="ChaupalTV"
          control={<Radio />}
          label="ChaupalTV"
        />
        <FormControlLabel value="MX" control={<Radio />} label="MX" />
        <FormControlLabel value="Peacock" control={<Radio />} label="Peacock" />
        <FormControlLabel
          value="Lionsgate Play"
          control={<Radio />}
          label="Lionsgate Play"
        />
        <FormControlLabel
          value="Paramount+"
          control={<Radio />}
          label="Paramount+"
        />
        <FormControlLabel value="VOOT" control={<Radio />} label="VOOT" />
        <FormControlLabel
          value="Miscellaneous"
          control={<Radio />}
          label="Miscellaneous"
        />
      </RadioGroup>
    </FormControl>
  );
}
