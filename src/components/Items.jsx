import { useEffect, useState, useContext } from "react";
import ItemCard from "./ItemCard";
import { SweeatsContext } from "../components/Context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { db } from "../firebase";
import {
  onSnapshot,
  collection,
  getDocs,
  getDoc,
  where,
  query,
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
} from "@firebase/firestore";
import ItemDialogBox from "./ItemDialogBox";
import { ValidatorForm } from "react-material-ui-form-validator";
import UILDButton from "./UILDButton";

export default function Items({ showSnackbar }) {
  const context = useContext(SweeatsContext);
  const [open, setOpen] = useState(false);
  const [openItemEDialog, setOpenItemEDialog] = useState([false, {}]);
  const [openItemDDialog, setOpenItemDDialog] = useState([false, {}]);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenItemEDialog = (item) => {
    setOpenItemEDialog([true, item]);
  };
  const handleCloseItemEDialog = () => {
    setOpenItemEDialog([false, {}]);
  };
  const handleOpenItemDDialog = (item) => {
    setOpenItemDDialog([true, item]);
  };
  const handleCloseItemDDialog = () => {
    setOpenItemDDialog([false, {}]);
  };

  useEffect(() => {
    async function getData() {
      return onSnapshot(
        query(
          collection(db, "stores"),
          where("store_id", "==", context.data.store_id)
        ),
        async (snapshot) => {
          const itemsArr = snapshot.docs[0].data().items;
          const itemsDataArr = [];
          for (let i = 0; i < itemsArr.length; i++) {
            const docSnap = await getDoc(itemsArr[i].ref);
            itemsDataArr.push({
              ...docSnap.data(),
              price: itemsArr[i].price,
              rating: itemsArr[i].rating,
              available: itemsArr[i].available,
            });
          }
          setItems(itemsDataArr);
          setFilteredData(itemsDataArr);
          setLoading(false);
        }
      );
    }
    getData();
  }, [db]);
  const handleSearch = (e) => {
    const w = e.target.value.toLowerCase();
    setSearch(w);
    if (w === "") {
      setFilteredData(items);
    } else {
      setFilteredData(items.filter((i) => i.Name.toLowerCase().includes(w)));
    }
  };
  return (
    <>
      {!loading ? (
        <div className="flex -mt-4 flex-col" style={{ width: "100%" }}>
          <div className="flex px-3 py-1 space-x-2" style={{ width: "120%" }}>
            {items.length === 0 ? (
              <div className="border rounded-xl flex w-full bg-gray-100 items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                  type="text"
                  disabled
                  className="w-full focus:outline-none py-2 px-3"
                  placeholder="No items to search"
                />
              </div>
            ) : (
              <div className="border rounded-xl flex w-full items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                  type="text"
                  className="w-full focus:outline-none py-2 px-3"
                  placeholder="Search items"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            )}
            <IconButton className="text-lg" onClick={handleClickOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                width="28"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </IconButton>
          </div>
          {filteredData.length === 0 ? (
            <div
              className="flex flex-col justify-center items-center py-4 px-3"
              style={{ width: "200%" }}
            >
              <Typography variant="h5">No items</Typography>

              <div className="flex justify-center text-sm mt-2 md:text-base w-full">
                Press&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                &nbsp;to add new item.
              </div>
            </div>
          ) : (
            <div className="ml-5 mt-5 grid grid-cols-1 md:grid-cols-2 p-0 gap-8 gap-x-6">
              {filteredData.map((item) => (
                <ItemCard
                  id={item.id}
                  name={item.Name}
                  price={item.price}
                  rating={item.rating}
                  image={item.imageURL || "/dish.jpg"}
                  available={item.available}
                  editButtonHandler={handleOpenItemEDialog}
                  deleteButtonHandler={handleOpenItemDDialog}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Box
          className="flex justify-center items-center py-32 p-10"
          sx={{ width: "600%" }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <ItemDialogBox
        feedback={showSnackbar}
        open={open}
        onClose={handleClose}
      />
      <ConfirmationDialog
        feedback={showSnackbar}
        open={openItemDDialog[0]}
        onClose={handleCloseItemDDialog}
        item={openItemDDialog[1]}
      />
      <EditDialog
        feedback={showSnackbar}
        open={openItemEDialog[0]}
        onClose={handleCloseItemEDialog}
        item={openItemEDialog[1]}
      />
    </>
  );
}
export const ConfirmationDialog = ({ open, onClose, item, feedback }) => {
  const context = useContext(SweeatsContext);
  const [loading, setLoading] = useState(false);
  const GetItemReference = async (name) => {
    const docSnap = await getDocs(collection(db, "sweets"));
    const items = docSnap.docs.map((doc) => {
      return { ref: doc.id, name: doc.data().Name };
    });
    return items.filter((i) => i.name === name)[0].ref;
  };
  const deleteItem = async () => {
    setLoading(true);
    try {
      const itemRef = await GetItemReference(item.name);
      await updateDoc(doc(db, "stores", context.data.store_fid), {
        items: arrayRemove({
          price: item.price,
          rating: item.rating,
          available: item.available,
          ref: doc(db, "sweets", itemRef),
        }),
      });
      feedback(["success", "Item deleted successfully."]);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.log("[Items] updateItem ", error);
      feedback(["error", "Item deletion failed."]);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <Grow in={open}>
        <Box>
          <DialogTitle className="font-bold">Delete Item</DialogTitle>
          <DialogContent>
            Delete <b>{item.name}</b> from items menu? This cannot be undone.
          </DialogContent>
          <DialogActions className="flex items-center mt-10 space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <UILDButton
              type="submit"
              loading={loading}
              text="Yes"
              color="error"
              variant="contained"
              onClick={deleteItem}
            />
          </DialogActions>
        </Box>
      </Grow>
    </Dialog>
  );
};
export const EditDialog = ({ open, onClose, item, feedback }) => {
  const context = useContext(SweeatsContext);
  const [itemPrice, setItemPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [itemAvailable, setItemAvailable] = useState(true);
  useEffect(() => {
    setItemPrice(item.price);
    setItemAvailable(item.available);
  }, [open]);
  const GetItemReference = async (name) => {
    const docSnap = await getDocs(collection(db, "sweets"));
    const items = docSnap.docs.map((doc) => {
      return { ref: doc.id, name: doc.data().Name };
    });
    return items.filter((i) => i.name === name)[0].ref;
  };
  const updateItem = async () => {
    setLoading(true);
    try {
      const itemRef = await GetItemReference(item.name);
      await updateDoc(doc(db, "stores", context.data.store_fid), {
        items: arrayRemove({
          price: item.price,
          rating: item.rating,
          available: item.available,
          ref: doc(db, "sweets", itemRef),
        }),
      });
      await updateDoc(doc(db, "stores", context.data.store_fid), {
        items: arrayUnion({
          price: itemPrice,
          rating: item.rating,
          available: itemAvailable,
          ref: doc(db, "sweets", itemRef),
        }),
      });
      feedback(["success", "Item updated successfully."]);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.log("[Items] updateItem ", error);
      feedback(["error", "Item updation failed."]);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <Grow in={open}>
        <Box>
          <ValidatorForm>
            <DialogTitle className="font-bold">Edit Item</DialogTitle>
            <DialogContent>
              <div className="flex flex-col pt-3 space-y-4">
                <TextField
                  disabled
                  value={item.name}
                  label="Item Name"
                  type="text"
                />
                <TextField
                  value={itemPrice}
                  defaultValue={itemPrice}
                  required
                  label="Item Price"
                  onChange={(e) => setItemPrice(e.target.value)}
                  type="number"
                />
                <div className="flex space-x-8">
                  <div>
                    <Tooltip title="Unchecking this would mark item out of stock and will not be shown in search results for your store.">
                      <Switch
                        checked={itemAvailable}
                        onChange={(e) => {
                          setItemAvailable(e.target.checked);
                        }}
                        color="warning"
                      />
                    </Tooltip>{" "}
                    Available
                  </div>
                  <Tooltip
                    title="Coming Soon..."
                    className="w-48 cursor-pointer"
                  >
                    <Box>
                      <Button variant="outlined" className="w-48" disabled>
                        Change item image
                      </Button>
                    </Box>
                  </Tooltip>
                </div>
              </div>
            </DialogContent>
            <DialogActions className="flex items-center mt-10 space-x-2">
              <Button onClick={onClose}>Cancel</Button>
              <UILDButton
                type="submit"
                loading={loading}
                text="Update Item"
                onClick={updateItem}
              />
            </DialogActions>
          </ValidatorForm>
        </Box>
      </Grow>
    </Dialog>
  );
};
