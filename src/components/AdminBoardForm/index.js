import React, { useState } from "react";
import axios from "axios";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../../Middlewares/Alertpop";
import { json, useNavigate } from "react-router-dom";
import Context, { getToken, removeToken } from "../../Context/Context";
import Languages from "../Languages";
import MoreOption from "../MoreOption";
import Header from "../Header";
import Cookies from "js-cookie";
// import Features from "../Features";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";
import Opendays from "../Opendays";
import Photos from "../CoverImage";
import OwnerPhotosUpload from "../OwnerPhotosUpload";
import { colors } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import { IconButton, makeStyles } from "@material-ui/core";


// const useStyles = makeStyles({
//   root: {
//     "&:hover": {
//       backgroundColor: "transparent"
//     }
//   }
// });

const AdminBoardForm = (props) => {
  const uuid = Cookies.get("uuid");
  console.log(uuid, "opk");
  const [time, setTime] = useState('7:00 AM');



  // time section
  const incrementTime = () => {
    let [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (hours === 11 && period === 'AM') {
      hours = 12;
      period = 'PM';
    } else if (hours === 11 && period === 'PM') {
      hours = 12;
      period = 'AM';
    } else if (hours === 12) {
      hours = 1;
    } else {
      hours++;
    }

    setTime(`${hours}:${minutes.toString().padStart(2, '0')} ${period}`);
  };

  const decrementTime = () => {
    let [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (hours === 12 && period === 'PM') {
      hours = 11;
      period = 'AM';
    } else if (hours === 12 && period === 'AM') {
      hours = 11;
      period = 'PM';
    } else if (hours === 1) {
      hours = 12;
    } else {
      hours--;
    }

    setTime(`${hours}:${minutes.toString().padStart(2, '0')} ${period}`);
  };



  const DataSalon = props.Salondata?.one;
  const SalonLocation =
    DataSalon?.["salon_location"]?.["coordinates"].join(", ");

    const [selectedGender, setSelectedGender] = useState("");

  const [formValues, setFormValues] = useState({
    username: DataSalon?.salon_username || "name",
    password: DataSalon?.salon_password || "***",
    code: DataSalon?.["salon_code"] || "",
    name: DataSalon?.["salon_name"] || "",
    email: DataSalon?.["salon_email"] || "",
    description: "",
    type: DataSalon?.["salon_type"] || "male",
    address: DataSalon?.["salon_address"] || "",
    area: DataSalon?.["salon_area"] || "",
    city: DataSalon?.["salon_city"] || "",
    state: DataSalon?.["salon_state"] || "",
    location: SalonLocation || "",
    slots_number: parseInt(DataSalon?.["salon_slots"]) || '',
    opening_time: DataSalon?.["salon_opening_time"] || "09:00 AM",
    closing_time: DataSalon?.["salon_closing_time"] || "06:00 PM",
    lunch_time: DataSalon?.["salon_lunch_start_time"] || "01:00 PM",
    lunch_time_end: DataSalon?.["salon_lunch_end_time"] || "01:30 PM",
    owner_name: DataSalon?.["salon_owner_name"] || "sumanth vartha",
    owner_mobile: DataSalon?.["salon_owner_mobile"] || "9876543210",
    owner_pancard_number:
      DataSalon?.["salon_owner_pancard_number"] || "234WERT092",
    bank_name: DataSalon?.["salon_bank_name"] || "State bank of india",
    bank_account_number:
      DataSalon?.["salon_bank_account_number"] || "3221655498746623",
    bank_IFSC_code: DataSalon?.["salon_bank_IFSC_code"] || "IFSC00123",
    // service: [{ name: "", discount: "", price: "", duration: "" }],
    // combo_service: [],
    features: {
      wifi: DataSalon?.["salon_features"]?.["feature_wifi"] || true,
      parking: DataSalon?.["salon_features"]?.["feature_parking"] || false,
      AC: DataSalon?.["salon_features"]?.["feature_AC"] || true,
    },
    languages: {
      hindi: DataSalon?.["salon_languages"]?.["language_hindi"] || true,
      english: DataSalon?.["salon_languages"]?.["language_english"] || false,
      telugu: DataSalon?.["salon_languages"]?.["language_telugu"] || true,
    },
   // photos: [],
  });
  const navigate = useNavigate();
  const [isReadOnly, setIsReadOnly] = useState(props.isReadOnly);
  let { Salondata } = props;
  const [newFeature, setNewFeature] = useState("");
  const [services, setServices] = useState(Salondata?.servicesRev || []);
  const [shouldUpload, setshouldUpload] = useState(true);

  const [uploadedPhotos, setUploadedPhotos] = useState(
    DataSalon?.["salon_photos"] || []
  );
  const [shouldUploadOwner, setshouldUploadOwner] = useState(true);
  const [uploadedPhotosOwner, setUploadedPhotosOwner] = useState(
    DataSalon?.["salon_photos"] || []
  );
  const [isActive, setisActive] = useState(DataSalon?.["salon_isActive"]);
  const [serviceCount, setServiceCount] = useState(
    DataSalon?.["salon_services"]?.length || 1
  );
  const [day, setSelectedDay] = useState("");
  const [blockSalon, setblockSalon] = useState(
    DataSalon?.["salon_block_dates"] || []
  );
  const [comboCount, setComboCount] = useState(1);
  const [comboservicecount, setComboServiceCount] = useState(2);
  const [combos, setCombos] = useState(Salondata?.combosRev || []);

  const [readsalonCode, setreadsalonCode] = useState(false);

  useState(() => {
    if (!DataSalon) {
      const initialServices = Array.from({ length: serviceCount }, () => ({
        name: "",
        discount: "",
        price: "",
        duration: "",
      }));
      setServices(initialServices);
    }
  }, [serviceCount]);

  useState(() => {
    if (!DataSalon) {
      const initialCombos = Array.from({ length: comboCount }, () => ({
        combo_name: ``,
        services: Array.from({ length: comboservicecount }, () => ""),
        combo_price: "",
        duration: "",
      }));
      setCombos(initialCombos);
    }
  }, [comboCount]);



  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    console.log(gender);
  };


  // 
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleTypeSelection = (selectedType) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      type: selectedType,
    }));
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const newServices = services.map((service, i) => {
      if (i === index) {
        return { ...service, [name]: value };
      }
      return service;
    });
    setServices(newServices);
  };

  const addService = () => {
    setServices([
      ...services,
      { name: "", discount: "", price: "", duration: "" },
    ]);
  };

  const removeService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };
  // combo
  const handleComboChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCombos = [...combos];
    if (name === "services") {
      updatedCombos[index][name] = value.split(",");
    } else {
      updatedCombos[index][name] = value;
    }
    setCombos(updatedCombos);
  };

  const addComboService = () => {
    setCombos([
      ...combos,
      { combo_name: "", services: [], combo_price: "", duration: "" },
    ]);
  };

  const removeComboService = (index) => {
    const updatedCombos = combos.filter((_, i) => i !== index);
    setCombos(updatedCombos);
  }; //

  const handleFeatureToggle = (feature) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      features: {
        ...prevValues.features,
        [feature]: !prevValues.features[feature],
      },
    }));
  };

  //
  const handleDeleteFeature = (feature) => {
    setFormValues((prevValues) => {
      const updatedFeatures = { ...prevValues.features };
      delete updatedFeatures[feature];
      return { ...prevValues, features: updatedFeatures };
    });
    console.log(feature);
  };

  //

  //
  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFormValues((prevValues) => ({
        ...prevValues,
        features: {
          ...prevValues.features,
          [newFeature]: true,
        },
      }));
      setNewFeature("");
    }
    console.log(newFeature);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = services.filter(
      (service) =>
        service.name !== "" &&
        service.discount !== "" &&
        service.price !== "" &&
        service.duration !== "lunch_time"
    );
    console.log(allFieldsFilled, services);
    
    var formData = new FormData();
    console.log(formValues)
    for(let arr in formValues){
      if (
        arr !== "features" &&
        arr !== "languages" &&
        arr !== "opening_time" &&
        arr !== "closing_time" &&
        arr !== "lunch_time" &&
        arr !== "lunch_time_end"
      ){
        formData.append(arr, formValues[arr])
      }
    }
    let x ;
    x = JSON.stringify(formValues.features);
    formData.append("features",x)
    x = JSON.stringify(formValues.languages);
    formData.append("languages",x);


    if(typeof formValues.opening_time==="string"&&
      formValues.opening_time.length>0
    ){
      formValues.opening_time[0] ==="0"
      ? (x = formValues.opening_time.replace("0", ""))
      : (x = formValues.opening_time);
      formData.append("opening_time", x);
    }

    if (
      typeof formValues.closing_time === "string" &&
      formValues.closing_time.length > 0
    ) {
      formValues.closing_time[0] === "0"
        ? (x = formValues.closing_time.replace("0", ""))
        : (x = formValues.closing_time);
      formData.append("closing_time", x);
    }
    if (typeof formValues.lunch_time === "string" && formValues.lunch_time.length > 0) {
      formValues.lunch_time[0] === "0"
        ? (x = formValues.lunch_time.replace("0", ""))
        : (x = formValues.lunch_time);
      formData.append("lunch_start_time", x);
    }

    if (
      typeof formValues.lunch_time_end === "string" &&
      formValues.lunch_time_end.length > 0
    ) {
      formValues.lunch_time_end[0] === "0"
        ? (x = formValues.lunch_time_end.replace("0", ""))
        : (x = formValues.lunch_time_end);
      formData.append("lunch_end_time", x);
    }
    formData.append("service", JSON.stringify(allFieldsFilled));
    formData.append("combo_service", JSON.stringify(combos));






    {/*
    Object.keys(formValues).forEach((key) => {
      if (key === "photos") {
        Array.from(formValues[key]).forEach((photo) => {
          formData.append("photos", photo);
        });
      } else if (key === "service") {
        formData.append("service", JSON.stringify(allFieldsFilled));
      } else if (key === "combo_service") {
        formData.append(key, JSON.stringify(combos));
      } else if (key === "features") {
        formData.append("features", JSON.stringify(formValues[key]));
      } else if (key === "languages") {
        formData.append("languages", JSON.stringify(formValues[key]));
      } else {
        formData.append(key, formValues[key]);
      }
    });*/}

    if (DataSalon) {
      formData.append("uuid", DataSalon["salon_uuid"]);
    }


    let headersList = {
      Accept: "*/*",
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    };

    if (DataSalon) {
      formData.append("block_dates", JSON.stringify(blockSalon));
      const response = await fetch(`${Context}/admin/salon/update`, {
        method: "PATCH",
        body: formData,
        headers: headersList,
      });
      
    let data = await response.json()
    console.log(data)
    }
    else {
      console.log("formdata"+formData)
      let response = await fetch(`${Context}/admin/add-new-salon`, {
        method: "POST",
        body: formData,
        headers: headersList,
      })
      let data = await response.json(); 
      console.log(data)

    }

{/*
    if (DataSalon) {
      formData.append("block_dates", JSON.stringify(blockSalon));
      formData.append("uuid", JSON.stringify(uuid));
      const response = await fetch(`${Context}/admin/salon/update`, {
        method: "PATCH",
        body: formData,
        headers: headersList,
      });

      let data = await response.json();

      if (data.code === 202) {
        Salondata = null;
        setIsReadOnly(true);
        alert("Salon updated successfully!");
        console.log(data);
      }
    } else {
      
      try {
        console.log("formdata"+formData)
        let response = await fetch(`${Context}/admin/add-new-salon`, {
          method: "POST",
          body: formData,
          headers: headersList,
        });
        let data = await response.json();
        console.log(data)
        let code = data.code;
        if (code === 500 || code === 406) {
          ToastError(data.message);
          return;
        }
        if (code === 401) {
          removeToken();
          navigate("/");
          ToastError(data.message);
          return;
        }

        alert("Salon added successfully!");
      } catch (error) {
        console.error("There was an error adding the salon!", error);
    */}  
     
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    
    const formdata = new FormData();
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
    }
  
    
    try {
      const response = await fetch(`${Context}/admin/add-new-salon`, {
        method: "POST",
        body: formdata,
        headers:headersList
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('There was an error adding the salon!', error);
    }
  };
  


  return (
    <div className="main-bg-container">
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: isReadOnly ? "" : "end",
          width: "440px",
        }}
      >
        {isReadOnly && (
          <button
            onClick={() => setIsReadOnly(false)}
            className="label"
            style={{
              textAlign: "center",
              background: "#CCBB8E",
              fontWeight: "bold",
              marginBottom: "30px",
              fontSize: "17px",
              marginLeft:"300px",
              padding:'10px'
            }}
          >
            Enable Edit
          </button>
        )}
        {!isReadOnly && props.search && (
          <MoreOption
            salonCode={formValues.code}
            isActive={isActive}
            setisActive={setisActive}
          />
        )}
      </div>

    {/*  <form onSubmit={handleSubmit}> */}
    <form onSubmit={handleSubmit}>
        <div className="top-cont">
          <div>
            <h4 className="heading-section">Salon Details</h4>
            <div className="heading-section">
              <label className="label">Salon code :</label>
              <div className="input-section">
                <input
                style={{width:'150px',height:"50px"}}
                  name="code"
                  type="text"
                  placeholder="Enter the salon code"
                  value={formValues.code}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly ? isReadOnly : readsalonCode}
                  disabled={readsalonCode}
                  autoComplete="false"
                />
              </div>
            </div>

            {/* salon name */}
            <div className="heading-section">
              <label className="label">Salon name :</label>
              <div className="input-section">
                <input
                style={{width:'455px',height:"40px"}}
                  name="name"
                  type="text"
                  placeholder="Enter the name of the salon"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  isReadOnly={isReadOnly}
                />
              </div>
            </div>
            {/*Adress  */}
            <div>
              <div className="heading-section">
                <label className="label">Salon Adress :</label>
                <textarea
                style={{width:'455px',height:"100px",background:'black',border:'1px solid #5B5441'}}
                  name="address"
                  type="text"
                  placeholder="Enter the address of salon"
                  value={formValues.address}
                  onChange={handleChange}
                  required
                  isReadOnly={isReadOnly}
                ></textarea>
              </div>
            </div>

            {/* Salon-email section */}
            <div className="heading-section">
              <label className="label">Email :</label>
              <div className="input-section">
                <input
                style={{width:'455px',height:"40px"}}
                  name="email"
                  type="email"
                  placeholder="Enter the mail-id"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/* salon category section */}

            <div className="heading-section " readOnly={isReadOnly}>
              <label className="label ">Category :</label>

              <div>
                <span
                  style={{
                    padding: "5px",
                    border: "0.3px solid #5B5441",

                    backgroundColor:
                      formValues.type === "unisex" ? "#5B5441" : "transparent",

                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => handleTypeSelection("unisex")}
                >
                  Unisex
                </span>
                <span
                  style={{
                    padding: "5px",
                    border: "0.3px solid #5B5441",

                    backgroundColor:
                      formValues.type === "men's salon"
                        ? "#5B5441"
                        : "transparent",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => handleTypeSelection("men's salon")}
                >
                  Men's Salon
                </span>
                <span
                  style={{
                    padding: "5px",
                    border: "0.3px solid #5B5441",

                    backgroundColor:
                      formValues.type === "beauty parlor"
                        ? "#5B5441"
                        : "transparent",
                    marginRight: "8px",
                  }}
                  onClick={() => handleTypeSelection("beauty parlor")}
                >
                  Beauty Parlor
                </span>
              </div>
            </div>
            {/* salon slot number section */}

            <div className="heading-section">
              <label className="label">Number of slots :</label>
              <div className="input-section">
                <input
                style={{width:'130px',height:"40px"}}
                  name="slots_number"
                  type="text"
                  placeholder="Enter a number"
                  value={formValues.slots_number}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*open days  */}

            <Opendays readOnly={isReadOnly} />
          </div>

          {/* owner deatails */}
          <div className="owner-section">
            <h3 className="credit">Crediential</h3>
            <div className="heading-section-creadentials">
              <label className="label-cre">User Name :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none",padding:'none',margin:'none'  }}
                  name="username"
                  type="text"
                  value={formValues.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/*  */}

            <div className="heading-section-creadentials">
              <label className="label-cre">Password :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>
            {/*  */}
            <h3 className="credit">Owner Details</h3>

            <div className="heading-section-creadentials">
              <label className="label-cre">Owner Name :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="owner_name"
                  type="text"
                  value={formValues.owner_name}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}

            <div className="heading-section-creadentials">
              <label className="label-cre">Owner Mobile :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="owner_mobile"
                  type="text"
                  value={formValues.owner_mobile}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}

            <div className="heading-section-creadentials">
              <label className="label-cre">PAN Card Number :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="owner_pancard_number"
                  type="text"
                  value={formValues.owner_pancard_number}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}
            <div className="heading-section-creadentials">
              <label className="label-cre">Bank Name :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="bank_name"
                  type="text"
                  value={formValues.bank_name}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}

            <div className="heading-section-creadentials">
              <label className="label-cre">Owner Bank account :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="bank_account_number"
                  type="text"
                  value={formValues.bank_account_number}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}
            <div className="heading-section-creadentials">
              <label className="label-cre">Owner Mobile :</label>
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="owner_mobile"
                  type="text"
                  value={formValues.owner_mobile}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
              
            </div>
            <div className="heading-section-creadentials">
            {props.search && (
              <div className="">
                <div
                  className="label"
                  style={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                    marginBottom: "30px",
                    fontSize: "20px",
                    marginTop: "20px",
                  }}
                >
                  Block Salon:
                </div>
                <div
                  className="input"
                  style={{ marginTop: "40px", marginBottom: "40px" }}
                >
                    <input
                      style={{border:'1px solid #ccbb8e',height:'30px',width:'200px'}}
                      name="newDate"
                      type="date"
                      value={blockSalon}
                      onChange={(e) => setblockSalon(e.target.value)}
                      required
                    />
                </div>
                <div style={{border:'1px solid #ccbb8e',width:'200px',display:'flex',justifyContent:'space-between'}}>
            <input type="time"
            style={{border:'none'}}
             />
            <AccessTimeIcon />
            </div>

              </div>
            )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Timings :</label>
          <div className="input-section ">
            <div className="time-section-cont">
              <div className="time-section">
                <label className="label-input-time">Opening Time :</label>
                <div className="time-input-cont">
                <input
                  style={{
                    border:"none"
                  }}
                  name="opening_time"
                  type="text"
                  placeholder="Time"
                  value={time.opening_time}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
                <div style={{display:'flex',flexDirection:'column'}} >

                <div className="arrow-button" onClick={incrementTime}><KeyboardArrowUpIcon fontSize="small" /></div>
                <div className="arrow-button" onClick={decrementTime}><KeyboardArrowDownIcon fontSize="small" marginBottom='none' marginTop='0px' paddingTop='0px' /></div>
                </div>
              </div>
              </div>
              <div className="time-section">
                <label className="label-input-time">Closing Time :</label>
                <div className="time-input-cont">

                <input
                   style={{
                    border:"none"
                  }}
                  name="closing_time"
                  type="text"
                  value={formValues.closing_time}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
                              <div style={{display:'flex',flexDirection:'column'}} >

<div className="arrow-button" onClick={incrementTime}><KeyboardArrowUpIcon fontSize="small" /></div>
<div className="arrow-button" onClick={decrementTime}><KeyboardArrowDownIcon fontSize="small" marginBottom='none' marginTop='0px' paddingTop='0px' /></div>
</div>
</div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Lunch Timings :</label>

          <div className="input-section">
            <div className="time-section-cont">
              <div className="time-section">
                <label className="label-input-time">Lunch Start Time :</label>
                <div className="time-input-cont">

                <input
                  style={{
                    border:"none"
                  }}
                  name="lunch_start_time"
                  type="text"
                  value={formValues.lunch_time}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
                              <div style={{display:'flex',flexDirection:'column'}} >

<div className="arrow-button" onClick={incrementTime}><KeyboardArrowUpIcon fontSize="small" /></div>
<div className="arrow-button" onClick={decrementTime}><KeyboardArrowDownIcon fontSize="small" marginBottom='none' marginTop='0px' paddingTop='0px' /></div>
</div></div>
              </div>
              <div className="time-section">
                <label className="label-input-time">Lunch End Time :</label>
                <div className="time-input-cont">

                <input
                  style={{
                    border:"none"
                  }}
                  name="lunch_end_time"
                  type="text"
                  value={formValues.lunch_time_end}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
                              <div style={{display:'flex',flexDirection:'column'}} >

                <div className="arrow-button" onClick={incrementTime}><KeyboardArrowUpIcon fontSize="small" /></div>
                <div className="arrow-button" onClick={decrementTime}><KeyboardArrowDownIcon fontSize="small" marginBottom='none' marginTop='0px' paddingTop='0px' /></div>
                </div></div>
              </div>
            </div>
          </div>
        </div>
        {/* Services Section */}
        <div className="heading-section">
          <label className="label">Services :</label>
          <div className="input-section">
            <div style={{display:"flex"}}>
          <div style={{display:"flex"}}>
                    <p
                      className={`salon-cat-item b-color ${
                        selectedGender === "male" ? "selected" : ""
                      }`}
                      onClick={() => handleGenderSelect("male")}
                    >
                      Male
                    </p>
                    <p
                      className={`salon-cat-item b-color ${
                        selectedGender === "female" ? "selected" : ""
                      }`}
                      onClick={() => handleGenderSelect("female")}
                    >
                      Female
                    </p>
                  </div>
            <div className="add-service-btn">
              <button type="button"className="add" onClick={addService}>
                +add services
              </button>
            </div>
            </div>

            <div className="input-section">
              <div>
                {services.map((service, index) => (
                  <div key={index} className="services-input-top-cont">
                    <div className="services-input-item">
                      <label className="label-input">Service name :</label>
                      <input
                        style={{
                          width: "195px", height: "40px"
                        }}
                        name="name"
                        type="text"
                        placeholder="Enter the name"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="services-input-item">
                      <label className="label-input">Discounted price :</label>
                      <input
                        style={{
                          width: "115px", height: "40px"
                        }}
                        name="discount"
                        type="number"
                        placeholder="Enter price"
                        value={service.discount}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="services-input-item">
                      <label className="label-input">Original Price :</label>
                      <input
                        style={{
                          width: "115px", height: "40px"
                        }}
                        name="price"
                        type="number"
                        placeholder="Enter Price"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="services-input-item">
                      <label className="label-input-dur">Duration :</label>
                      <input
                        style={{
                          width: "115px", height: "40px"
                        }}
                        name="duration"
                        type="text"
                        placeholder="Duration time"
                        value={service.duration}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <button type="button" onClick={() => removeService(index)}>
                     <div> <DeleteOutlineIcon style={{background:'none',mixBlendMode:'multiply'}} className="del-btn" /></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Combo service section */}
        <div className="heading-section">
          <label className="label">Combo Services :</label>
          <div className="input-section">
            <div className="add-service-btn">
              <button type="button"className="add" onClick={addComboService}>
                +Add Service
              </button>
            </div>
            {combos.map((combo, index) => (
              <div key={index} className="services-input-cont">
                <div className="services-input-top-cont">
                  <div className="services-input-item">
                    <label className="label-input">service 1 :</label>
                    <input
                      style={{
                        width: "195px", height: "40px"
                      }}
                      name="combo_name"
                      type="text"
                      placeholder="Enter the name"
                      value={combo.combo_name}
                      onChange={(e) => handleComboChange(index, e)}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                  <button type="button" onClick={() => removeService(index)}>
                      <DeleteIcon className="del-btn" />

                    </button>

                  <div className="services-input-item">
                    <label className="label-input">Service 2 :</label>
                    <input
                      style={{
                        width: "195px", height: "40px"
                      }}
                      name="services"
                      type="text"
                      placeholder="Enter the name"
                      value={combo.services.join("")}
                      onChange={(e) => handleComboChange(index, e)}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                  <button type="button" onClick={() => removeService(index)}>
                      <DeleteIcon className="del-btn" />
                    </button>
                </div>
                <div>
                  <div className="services-input-top-cont">
                    <div className="services-input-item">
                      <label className="label-input">Price :</label>
                      <input
                        style={{
                          width: "113px", height: "40px"
                        }}
                        name="combo_price"
                        type="number"
                        placeholder="Enter price"
                        value={combo.combo_price}
                        onChange={(e) => handleComboChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="services-input-item">
                      <label className="label-input">Duration :</label>
                      <input
                        style={{
                          width: "113px", height: "40px"
                        }}
                        name="duration"
                        type="text"
                        placeholder="Duration time :"
                        value={combo.duration}
                        onChange={(e) => handleComboChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeComboService(index)}
                    >
                      <DeleteIcon className="del-btn" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button style={{border:'1px solid  #5B5441'}} type="button" className="combo" onClick={addComboService}>
              Add a combo
            </button>
          </div>
        </div>
        <Photos
          uploadedimages={uploadedPhotos}
          setUploadedimages={setUploadedPhotos}
          isReadOnly={isReadOnly}
          shouldUpload={shouldUpload}
          setshouldUpload={setshouldUpload}
          show={props.search}
        />

        <OwnerPhotosUpload
          uploadedimages={uploadedPhotosOwner}
          setUploadedimages={setUploadedPhotosOwner} // Correctly reference the function here
          isReadOnly={isReadOnly}
          shouldUploadOwner={shouldUploadOwner}
          setshouldUploadOwner={setshouldUploadOwner}
          show={props.search}
        />

        {/* Features section */}
        {/* <div>
          <label>Features</label>
          <input
            name="features"
            type="text"
            value={formValues.features}
            onChange={handleChange}
          />
        </div> */}
        <div className="heading-section">
          <label className="label">Features :</label>
          <div className="input-section">
            <div className="salon-owner-feature-container">
              <div className="add-feature">
                <input
                  className="add-feature-input"
                  type="text"
                  placeholder="Enter other features"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  readOnly={isReadOnly}
                />
                <button
                  className="add-feature-button"
                  type="button"
                  onClick={handleAddFeature}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="feature-item">
              {Object.entries(formValues.features).map(
                ([key, value], index) => (
                  <div
                    key={index}
                    style={{ background: "#222222", marginTop: "20px" }}
                  >
                    <label>
                      <input
                      
                        style={{ marginRight: "10px" }}
                        type="checkbox"
                        checked={value}
                        onChange={() => handleFeatureToggle(key)}
                      />
                      {key}
                    </label>
                    <button
                      className="delete-button" 
                      onClick={() => handleDeleteFeature(key)}
                    >
                      <DeleteIcon  background='none' />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Area : </label>
          <div className="input-section">
            <input
            style={{width:'300px',height:"50px"}}
              name="area"
              type="text"
              placeholder="Enter the area"
              value={formValues.area}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
            />
          </div>
        </div>
        <div className="heading-section">
          <label className="label">City :</label>
          <div className="input-section">
            <input
            style={{width:'300px',height:"40px"}}
              name="city"
              type="text"
              placeholder="Enter the city"
              value={formValues.city}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </div>
        </div>
        <div className="heading-section">
          <label className="label">State :</label>
          <div className="input-section">
            <input
            style={{width:'300px',height:"40px"}}
              name="state"
              type="text"
              placeholder="Enter the state"
              value={formValues.state}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Location :</label>
          <div className="input-section">
            <input
            style={{width:'300px',height:"30px"}}
              name="location"
              type="text"
              placeholder="Enter the location"
              value={formValues.location}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
            />
          </div>
        </div>
        {/*  */}
        {/* <div>
          <label>Languages</label>
          <input
            name="languages"
            type="text"
            value={formValues.languages}
            onChange={handleChange}
          />
        </div> */}
        {/*  */}
        <Languages
          formValues={formValues}
          setFormValues={setFormValues}
          readOnly={isReadOnly}
        />
        {/*  */}
        <div className="heading-section">
          <label className="label">Photos :</label>
          <div className="input-section">
            <input name="photos"type="file"multiple onChange={handleChange} />
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Description :</label>
          <div className="input-section">
            <input
            style={{width:'300px',height:"100px"}}
              name="description"
              type="text"
              placeholder="Description"
              value={formValues.description}
              onChange={handleChange}
              isReadOnly={isReadOnly}
            />
          </div>
        </div>
        <hr className="hrr"/>
        {/*  */}
        <div
  // style={{
  //   textAlign: "center",
  //   display: "flex",
  //   flexDirection: "row",
  //   gap: "80px",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: "10vh",
  // }}
>
  {!isReadOnly && !props.search && (
    <>
      <button className="submit" type="submit" disabled={isReadOnly}>
        Save
      </button>
    </>
  )}
</div>
<div
  style={{
  
    marginBottom: "10vh",
  }}
>
  {!isReadOnly && props.search && (
    <>
      <button className="submit " type="submit" disabled={isReadOnly}>
        Save Changes
      </button>
      <button
        style={{
          marginLeft: "20px",
          
          paddingLeft: "70px",
          paddingRight: "70px",
          backgroundColor: "grey",
          boder: "1px solid #black",
          height: "50px",
          color: "white",
        }}
        onClick={() => setIsReadOnly(true)}
      >
        Cancel Changes
      </button>
    </>
  )}
</div>
      </form>
    </div>
  );
};

export default AdminBoardForm;
