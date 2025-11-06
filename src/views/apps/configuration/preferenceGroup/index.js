import { useState } from "react";
import "ag-grid-enterprise";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import {Card,Form,Label,Button,CardBody,Row,Col,InputGroup,Input,Modal,ModalHeader,ModalBody,} from "reactstrap";
import classnames from "classnames";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import { AgGridReact } from "ag-grid-react";
import "/node_modules/ag-grid-community/styles/ag-grid.css";
import "/node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useRef, useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../../config";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem,} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const defaultValues = {
    preferenceGroup: "",
    description: "",
};

const Preference = () => {

  const [open, setOpen] = useState("");
  const toggle = (id) => {open === id ? setOpen() : setOpen(id);  };
  const [rowData, setRowData] = useState();
  const [popUp, setPopUp] = useState(false);
  const gridRef = useRef();
  const [data, setData] = useState(null);
  const { reset, handleSubmit, control } = useForm({ defaultValues });
  let navigate = useNavigate();
  const lookupValue = (mappings, key) => {return mappings[key];  };
  const [newActiveStatus, setNewActiveStatus] = useState(null);
  const [roomClass, setRoomClassID] = useState(null);
  const colourMappings = {
    1: "Active",
    0: "Inactive",
  };
  const extractKeys = (mappings) => {
    return Object.keys(mappings);
  };
  const colourCodes = extractKeys(colourMappings);


  const [columnDefs, setColumnDefs] = useState([
    {headerName: "Preference Group", field: "preferenceGroup", suppressSizeToFit: true, cellStyle: { "text-align": "center", "background-color": "#F1E39B" }, maxWidth: 180, },
    {headerName: "Description", field: "description", suppressSizeToFit: true, cellStyle: { "text-align": "center", "background-color": "pink" }, maxWidth: 200, },
    {headerName: "Status", field: "isActive", cellStyle: { "text-align": "center", "background-color": "#F1E39B" }, suppressSizeToFit: true, maxWidth: 150,   editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: colourCodes },
      valueFormatter: (params) => {
        return lookupValue(colourMappings, params.value);
      },
      filter: "agSetColumnFilter",
    },
  ]);



  const onCellValueChanged = useCallback((event) => {
   
    let isActive = Number(event.data.isActive);
    //  console.log(isActive)
    //  console.log(event.data.isActive)

    let OldValue = oldValue;
    //  console.log(oldValue)
    //  console.log(OldValue)

    let ID = event.data["id"];
    const IDNumber = event.data.id;
    setRoomClassID(IDNumber);
    //  console.log(ID)
    //  console.log(event.data.id)

    let newActive = event.data.isActive;
   
    if (event.data.isActive !== oldValue) {
      const newActiveStatus = event.data.isActive;
      setNewActiveStatus(newActiveStatus);
      const oldActiveStatus = oldValue;
      // setFullData(RoomType,oldRoomType,newRoomType,event.data.date)
      setPopUp("Do You  Want to Change Revenue Group Status ?");
    }

    const updatedItem = JSON.stringify({
      isActive: event.newValue.split("(")[0],
    });
    //  console.log(updatedItem)
    fetchx(API_URL + `/updatetranGroups?id=${event.data.id}`, {
      method: "PUT",
      body: updatedItem,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((post) => {
         })
      .catch((err) => {
        //  console.log(err.message)
      });
  }, []);

  function Confirm(event) {
    const updatedItem = JSON.stringify({
      isActive: newActiveStatus,
      id: roomClass,
    });
    // console.log(updatedItem)
    fetchx(API_URL + `/updatetranGroups`, {
      method: "PUT",
      body: updatedItem,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        const swalInstance = MySwal.fire({
          text: "Updated Active Status Successfully!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Close",
          allowOutsideClick: false,
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            navigate("");
          }
        });
        // console.log(post)
        if (post.statusCode === 200) {
          setPopUp(false);
          fetchx(API_URL + "/getroomclass?hotelID=1")
            .then((result) => result.json())
            .then((rowData) => {
              // console.log(rowData['data'])
            });
        }
      })
      .catch((err) => {
        // console.log(err.message)
      });
  }

  const [oldValue, setOldValue] = useState(null);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
       const currentValue = event.data.isActive;

    setOldValue(currentValue); 
  }, []);

  useEffect(() => {    
    fetchx(API_URL + "/getReservationPreferenceGroup?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);


  const onSubmit = (data) => {
    setData(data);
        let reservationGroup = JSON.stringify({
        preferenceGroup: data.preferencegrp,
        description: data.description,
        isActive: 1,
      });
      // console.log(reservationGroup)
      let res = fetchx(API_URL + "/addReservationPreferencesGroups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: reservationGroup,
      })
        .then((data) => data.json())
        .then((res) => {
          navigate("");
          // console.log(res);
          // console.log(res.message);
          if (res["statusCode"] == 200) {
            fetchx(API_URL + "/getReservationPreferencesGroups?hotelID=1")
              .then((result) => result.json())
              .then((rowData) => {
                setRowData(rowData["data"]);
                // console.log(rowData['data'])
                const swalInstance = MySwal.fire({
                  text: "Preference Group Added Successfully!",
                  icon: "success",
                  buttonsStyling: false,
                  confirmButtonText: "Close",
                  allowOutsideClick: false,
                  customClass: {
                    confirmButton: "btn btn-danger",
                  },
                });
                swalInstance.then((result) => {
                  if (result.isConfirmed) {
                    navigate("");
                  }
                });
              });
          } else {
            const swalInstance = MySwal.fire({
              text: res.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Close",
              allowOutsideClick: false,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
            swalInstance.then((result) => {
              if (result.isConfirmed) {
                navigate("");
              }
            });
          }
        });
  };

  const handleReset = () => {
    reset({
      preferencegrp: "",
      description: "",
      activeStatus: "",
    });
  };
  const [taxValue, setTaxValue] = useState("");

  const handleTaxPercentageChange = (value) => {
    // console.log('Tax Amt:', value);
    setTaxValue(value);
    // calculateTaxAmount(basePrice, value);
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  return (
    <div>
      <div className="disabled-animation-modal">
        <Modal
          isOpen={popUp}
          toggle={() => setPopUp(!popUp)}
          className="modal-sm"
        >
          
          {/*onClosed={onDiscard}*/}
          <ModalHeader
            className="modal-sm"
            toggle={() => {
              setPopUp(!popUp);
            }}
          >
            Need To Check..
          </ModalHeader>
          <ModalBody className="pb-3 px-sm-2 mx-20">
            <div>
              <b>{popUp}</b>
              <br></br>
              <br></br>
              <div className="d-flex">
                <Button
                  color="primary"
                  className="me-1"
                  // className="text-center"
                  onClick={() => Confirm()}
                >
                  Confirm
                </Button>
                <Button
                  color="danger"
                  className="me-1"
                  // className="text-center"
                  onClick={() => {
                    setPopUp(false), navigate("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>

      <div>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <h4>
                <b>Add Preference Group </b>
              </h4>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <Card>
             
                <CardBody>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="preferencegrp">
                          Preference Group  <spam style={{ color: "red" }}>*</spam>
                          </Label>
                          <InputGroup className="input-group-merge">
                            <Controller
                              id="preferencegrp"
                              name="preferencegrp"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  required
                                  placeholder="Preference Group Code"
                                  {...field}
                                  onChange={(e) => {
                                    // Capture the value and call the handler function
                                    const value = e.target.value;
                                    field.onChange(value);
                                    handleTaxPercentageChange(value);
                                  }}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null &&
                                      (data.preferencegrp === null ||
                                        !data.preferencegrp.length),
                                  })}
                                />
                              )}
                            />
                          </InputGroup>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="mb-1">
                          <Label className="form-label" for="description">
                            Description <spam style={{ color: "red" }}>*</spam>
                          </Label>
                          <InputGroup className="input-group-merge">
                            <Controller
                              id="description"
                              name="description"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  required
                                  placeholder="Description"
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null &&
                                      (data.description === null ||
                                        !data.description.length),
                                  })}
                                  // options={{ phone: true, phoneRegionCode: 'US' }}y
                                />
                              )}
                            />
                          </InputGroup>
                        </div>
                      </Col>
                    
                      <div className="d-flex">
                        <Button className="me-1" color="primary" type="submit">
                          Submit
                        </Button>
                        <Button
                          outline
                          color="secondary"
                          type="reset"
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            Search
          </Label>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </Col>
      </div>

      <br></br>
      <div>
        <Card>
          <div className="ag-theme-alpine" style={{ height: 540 }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              animateRows={true}
              rowSelection="multiple"
              onCellClicked={cellClickedListener}
              onCellValueChanged={onCellValueChanged}
              paginationPageSize="10"
              pagination="true"
              defaultColDef={defaultColDef}
              headerColor="ddw-primary"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Preference;