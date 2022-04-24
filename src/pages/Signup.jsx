import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, GeoPoint, collection } from "@firebase/firestore";
import { db } from "../firebase";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

export default function Signup() {
  const [storeName, setStoreName] = useState("");
  const [password, setPasssword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [loading, setLoading] = useState(false);

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
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    function randomString() {
      const length = 16;
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var result = "";
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
    async function register() {
      try {
        await addDoc(collection(db, "stores"), {
          adminEmail: email,
          delivery: false,
          discount: 0,
          items: [],
          location: new GeoPoint(0, 0),
          name: storeName,
          store_id: randomString(),
          store_rating: 0,
          tagline: "Sweet Store",
          password: password,
        });
        handleClickOpen(
          "Registration successful. You will be redirected to login page."
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        handleClickOpen("Registration failed.");
        console.log("[Signup] error", error);
      }
    }

    if (
      storeName === "" ||
      password === "" ||
      address === "" ||
      email === "" ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      handleClickOpen("Please fill the required fields properly.");
      setLoading(false);
    } else {
      register();
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
          style={{ backgroundImage: `url("../header.png")` }}
        >
          <h1 className="text-3xl md:text-5xl font-bold pl-3 md:pl-8">
            Sweeat
          </h1>
        </header>
        <section className="flex flex-col justify-center items-center w-full -mt-2">
          <h2 className="text-3xl font-bold">Register</h2>
          <div className="flex justify-center rounded-lg border py-8 w-3/6 mt-5 drop-shadow-md bg-white">
            <form className="flex flex-col justify-center items-center space-y-3 w-full">
              <div className="inputBox w-3/4">
                <div className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"
                      fill="#666"
                    />
                  </svg>
                </div>
                <input
                  required
                  placeholder="Store Name"
                  onChange={(e) => setStoreName(e.target.value)}
                  type="text"
                />
              </div>
              <div className="inputBox w-3/4">
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
                  required
                  placeholder="Admin Email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div className="inputBox w-3/4">
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
                  required
                  placeholder="Password"
                  onChange={(e) => setPasssword(e.target.value)}
                  type="password"
                />
              </div>
              <div className="inputBox w-3/4">
                <div className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
                      fill="#666"
                    />
                  </svg>
                </div>
                <input
                  required
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="button button-purple bg-[#ed71af] w-32"
                onClick={handleSubmit}
              >
                {loading ? (
                  <CircularProgress size="1rem" color="primary" />
                ) : (
                  <>Register</>
                )}
              </button>
            </form>
          </div>
          <div
            className="font-bold text-sm mt-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Or login into your store here
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
            <b>Status</b>
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
