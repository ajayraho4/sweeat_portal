import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "@firebase/firestore";
import { SweeatsContext } from "../components/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useContext(SweeatsContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("");

  const handleClickOpen = (msg) => {
    setAlertText(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = createTheme({
    typography: {
      fontFamily: ["Proxima Nova"].join(","),
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    async function getData() {
      try {
        const queryQ = query(
          collection(db, "stores"),
          where("adminEmail", "==", email),
          where("password", "==", password)
        );
        const docSnap = await getDocs(queryQ);
        if (docSnap.docs.length === 1) {
          context.data = {
            store_fid: docSnap.docs[0].id,
            store_id: docSnap.docs[0].data().store_id,
            location: docSnap.docs[0].data().location,
            name: docSnap.docs[0].data().name,
            store_rating: docSnap.docs[0].data().store_rating,
            discount: docSnap.docs[0].data().discount,
            adminEmail: docSnap.docs[0].data().adminEmail,
            tagline: docSnap.docs[0].data().tagline,
            delivery: docSnap.docs[0].data().delivery,
            rating: docSnap.docs[0].data().store_rating,
            address: docSnap.docs[0].data().address,
          };
          navigate("/store/");
        } else {
          handleClickOpen(
            "No such account found. Recheck entered credentials."
          );
          setLoading(false);
        }
      } catch (err) {
        console.log("[Login] error ", err);
      }
    }
    if (
      email === "" ||
      password === "" ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      handleClickOpen("Please fill the required fields properly.");
      setLoading(false);
    } else {
      getData();
    }
  };
  return (
    <>
      <div className="h-screen w-full absolute top-0 left-0 bg-gray-500 flex items-center text-center justify-center md:hidden">
        <h1 className="text-5xl font-bold text-white">
          Use of bigger screen is recommended.
        </h1>
      </div>
      <div className="hidden md:flex flex-col">
        <header
          className="flex pt-3 md:pt-6 w-full"
          style={{ backgroundImage: `url("../headerPurple.png")` }}
        >
          <h1 className="text-3xl md:text-5xl font-bold pl-3 md:pl-8">
            Sweeat
          </h1>
        </header>
        <section className="flex flex-col justify-center items-center w-full py-4">
          <h2 className="text-3xl font-bold">Login</h2>
          <div className="flex justify-center rounded-lg border py-8 px-8 w-3/6 mt-5 drop-shadow-md bg-white">
            <form
              className="flex flex-col justify-center items-center space-y-3 w-full"
              onSubmit={handleSubmit}
            >
              <div className="inputBox">
                <div className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
                      fill="#666"
                    />
                  </svg>
                </div>
                <input
                  placeholder="Admin Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div className="inputBox">
                <div className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
                      fill="#666"
                    />
                  </svg>
                </div>
                <input
                  placeholder="Password"
                  required
                  onChange={(e) => setPasssword(e.target.value)}
                  type="password"
                />
              </div>
              <br />
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="button button-purple w-32"
              >
                {loading ? (
                  <CircularProgress size="1rem" color="primary" />
                ) : (
                  <>Login</>
                )}
              </button>
            </form>
          </div>
          <div
            className="font-bold text-sm mt-5 cursor-pointer"
            onClick={() => navigate("/register/")}
          >
            New with Sweeat? Register your store here
          </div>
        </section>
      </div>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            <b>Login</b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              okay
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
