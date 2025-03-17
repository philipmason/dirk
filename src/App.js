// import "./App.css";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import Dirk2 from "./Dirk2.png";
import { useEffect, useState } from "react";

// http://localhost:3001/?id=6f048334-62cb-4c07-9e96-e54ebe14435b
// http://localhost:3001/?id=9d02e175-ff15-44a9-a634-da70d0926e2f

function App() {
  const { search } = window.location,
    searchParams = new URLSearchParams(search),
    id = searchParams.get("id"),
    // [guests, setGuests] = useState([]),
    [who, setWho] = useState(""),
    [event1, setevent1] = useState(false),
    [event2, setevent2] = useState(false),
    handleChangeEvent1 = (e) => {
      console.log("e.target.value", e.target.value);
      setQ1(e.target.checked);
    },
    [q1, setQ1] = useState(false),
    [q2, setQ2] = useState(false),
    [q3, setQ3] = useState(""),
    // prefix = "https://sleepy-wave-20058-78beaf0578d1.herokuapp.com",
    prefix = "http://81.141.65.156:3000",
    saveAnswers = () => {
      const url =
        prefix +
        "/sql/wedding/insert%20into%20responses" +
        "(id,name,response1,response2,dietary)%20" +
        `values('${id}','${who}',${q1},${q2},'${q3}')`;
      // use fetch to write the answers to the server
      fetch(url).then((response) => {
        console.log("response", response);
      });
    };

  useEffect(() => {
    fetch(prefix + "/guests")
      .then((response) => response.json())
      .then((response) => {
        const tempGuests = response.data;
        console.log("response", response, "id", id, "tempGuests", tempGuests);
        // setGuests(tempGuests);
        const guest = tempGuests.find((guest) => guest.id === id),
          { name: n, event1: a, event2: b } = guest;
        setWho(n);
        setevent1(a);
        setevent2(b);
        console.log("guest", guest, "name", n, "event1", a, "event2", b);
      });
  }, [id]);

  return (
    <Box
      style={{
        backgroundImage: `url(${Dirk2})`,
        height: "100vh",
        backgroundRepeat: "repeat-y",
        backgroundSize: "900px 400px",
      }}
    >
      <h1>Dirk & Tine's Celebrations</h1>
      <Box>Welcome {who}</Box>
      {Boolean(event1) && (
        <Box>
          <hr />
          <h3>Event 1</h3>
          Are you able to come?
          <Checkbox checked={q1} onChange={handleChangeEvent1} />
        </Box>
      )}
      {Boolean(event2) && (
        <Box>
          <hr />
          <h3>Event 2</h3>
          Are you able to come?
          <Checkbox checked={q2} onChange={() => setQ2(!q2)} />
          <TextField
            value={q3}
            onChange={(e) => {
              setQ3(e.target.value);
            }}
            sx={{ width: "100%" }}
            label="Do you have any dietary requirements?"
          />
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={saveAnswers}>
        Save your answers
      </Button>
    </Box>
  );
}

export default App;
