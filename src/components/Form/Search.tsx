import TextField from "@mui/material/TextField";
import { SearchSharp } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";

const Search = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <form>
        <TextField
          placeholder="Поиск по тэгу"
          size="small"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharp />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default Search;
