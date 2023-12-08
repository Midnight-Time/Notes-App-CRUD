import Typography from "@mui/material/Typography";
import React from "react";

interface MsgProps{
  message: string
};

const NoResultsMgs: React.FC<MsgProps> = (props) => {
  return (
    <Typography variant="body1" marginTop={6}>
      {props.message}
    </Typography>
  );
};

export default NoResultsMgs;
