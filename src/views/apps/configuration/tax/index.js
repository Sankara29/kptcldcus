import React, { useState,useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  CardBody,
  Col,
  Row,
  Label,
  InputGroup,
  Button,
  Input,
  Form,
} from "reactstrap"; 
import { AgGridReact } from "ag-grid-react"; 
import Select from "react-select"; 
import classnames from "classnames";
import { useRef, useMemo, useCallback } from "react";
import "cleave.js/dist/addons/cleave-phone.us";
import Cleave from "cleave.js/react";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import API_URL from "../../../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PostingType = [
  { value: "Flat Percentage", label: "Flat Percentage" },
  { value: "Flat Amount", label: "Flat Amount" },
  { value: "SLABS", label: "SLABS" },
];

const App = () => {
  const { control, handleSubmit } = useForm();
  const [postingType, setPostingType] = useState("");
  const [data, setData] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState("0");
  const gridRef = React.useRef();
  const [numberOfSlabs, setNumberOfSlabs] = useState(0); 
  
  const [taxName, setTaxName] = useState('');
  let navigate = useNavigate();
  const [fromAmountValues, setFromAmountValues] = useState(
    Array.from({ length: numberOfSlabs }, () => "")
  );
  const [toAmountValues, setToAmountValues] = useState(
    Array.from({ length: numberOfSlabs }, () => "")
  );
  const [taxPercentageValues, setTaxPercentageValues] = useState(
    Array.from({ length: numberOfSlabs }, () => "")
  );
  const [taxMapValues, setTaxMapValues] = useState(
    Array.from({ length: numberOfSlabs }, () => "")
  );

  const handleChange = (event) => {
    const input = event.target.value;
    const filteredValue = input.replace(/[^a-zA-Z]/g, '');
    const uppercaseValue = filteredValue.toUpperCase();
    setTaxName(uppercaseValue);
  };
  const [taxOptions, setTaxOptions] = useState([]);
  const [selectedTax, setSelectedTax] = useState('');


  const numberofslabs=[
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
   
  ];



  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        const response = await fetchx(API_URL + "/gettaxmap");
        const responseData = await response.json();

        if (
          responseData.status === "success" &&
          Array.isArray(responseData.data)
        ) {
          setTaxOptions(
            responseData.data.map((tax) => ({
              value: tax.id,
              label: tax.taxName,
            }))
          );
        } else {
          console.error("Invalid or unsuccessful response: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchTaxData();
  }, []);
  
 const handleTaxMapChange = (newValue, index) => {
    const newTaxMapValues = [...taxMapValues];
    newTaxMapValues[index] = newValue || ""; 
    setTaxMapValues(newTaxMapValues); 
  };
  const handleNumberOfSlabsChange = (selectedOption) => {
  
    setNumberOfSlabs(selectedOption.value);
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  useEffect(() => {
    fetchx(API_URL + "/gettaxDetails")
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData["data"]);
      });
     
  }, []);

  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Tax Name",
      field: "taxName",
      cellStyle: { "text-align": "left", "background-color": "#F1E39B" },
      headerClass: "text-center",
      maxWidth: 150,
    },

    {
      headerName: "Tax Code",
      field: "taxCode",
      cellStyle: { "text-align": "left", "background-color": "#F1E39B" },
      headerClass: "text-center",
      maxWidth: 150,
    },

    {
      headerName: "Applies From",
      field: "appliesFrom",
      cellStyle: { "text-align": "left", "background-color": "#F1E39B" },
      headerClass: "text-center",
      maxWidth: 150,
      valueFormatter: function(params) {
        const date = new Date(params.value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    },
    {
      headerName: "Posting Type",
      field: "postingType",
      cellStyle: { "text-align": "left", "background-color": "#F1E39B" },
      headerClass: "text-center",
      maxWidth: 150,
    },
    {
      headerName: "Tax Percentage",
      field: "taxPercentage",
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      headerClass: "text-center",
      maxWidth: 150,
    },
    {
      headerName: "No. of Slabs",
      field: "noOfSlabs",
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      headerClass: "text-center",
      maxWidth: 150,
    },
  ]);

  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
  };
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));


  
  const onSubmit = async (data) => {
      setData(data);
  try {
    if (postingType === "Flat Percentage") {
            const response = await fetchx(API_URL + "/insertintoTax", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                taxName: `${taxName}-${data.taxPercentage}%`,
                taxCode: data.taxCode,
                appliesFrom: data.appliesFrom,
                exemptAfter: data.exemptAfter,
                postingType: postingType,
                taxPercentage: data.taxPercentage,
                taxPlatformId: data.taxPlatformId,
                note: data.note,
              }),
            });
            if (response.ok) {
              const result = await response.json();
              Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Data inserted successfully!",
              });
              navigate("");
            } else {
              console.error("Failed to fetch");
            }
          } else if (postingType === "Flat Amount") {
            const response = await fetchx(API_URL + "/insertintoTax", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                taxName: taxName,
                taxCode: data.taxCode,
                appliesFrom: data.appliesFrom,
                exemptAfter: data.exemptAfter,
                postingType: postingType,
                Amount: data.taxAmount,
                taxPlatformId: data.taxPlatformId,
                note: data.note,
              }),
            });
            if (response.ok) {
              const result = await response.json();
              Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Data inserted successfully!",
              });
              navigate("");
            } else {
              console.error("Failed to fetch");
            }
          }
    else if (postingType === "SLABS") {
      console.log(data.NumberOfSlabs);
      console.log(numberOfSlabs);
      const taxResponse = await fetchx(API_URL + '/insertTaxData', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taxName: taxName,
          taxCode: data.taxCode,
          appliesFrom: data.appliesFrom,
          exemptAfter: data.exemptAfter,
          postingType: postingType,
          noOfSlabs : numberOfSlabs,
          Amount: data.taxAmount,
          taxPlatformId: data.taxPlatformId,
          note: data.note
        }),
      });
  
      if (taxResponse.ok) {
        const taxData = await taxResponse.json();
        const taxId = taxData.data.id;
       
        for (let i = 0; i < numberOfSlabs; i++) {
          const generationResponse = await fetchx(API_URL + '/insertTaxGenerationData', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fromAmounts: fromAmountValues[i],
              toAmounts: toAmountValues[i],
              taxPercentage: taxPercentageValues[i],
              taxName : taxName,
              taxID: taxId,
              taxMap:taxMapValues[i]["value"]
            }),
          });
  
          if (generationResponse.ok) {
            const result = await generationResponse.json();
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "Data inserted successfully!",
            });
            navigate("");
          } else {
            console.error("Failed to insert into taxGeneration table");
          }
        }
      } else {
        console.error("Failed to insert into tax table");
      }
    }
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div>
      <Card>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">Tax</AccordionHeader>
            <AccordionBody accordionId="1">
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="4" sm="12" className="mb-1">
                      <div className="mb-1">
                        <Label className="form-label" for="Postingtype">
                          Posting Type<span className="text-danger">*</span>
                        </Label>
                        <Controller
                          id="Postingtype"
                          control={control}
                          name="Postingtype"
                          render={({ field }) => (
                            <Select
                              required
                              isClearable
                              options={PostingType}
                              classNamePrefix="select"
                              className={classnames("react-select", {
                                "is-invalid":
                                  data !== null && data.PostingType === null,
                              })}
                              onChange={(selectedOption) => {
                                setPostingType(selectedOption.value);
                                field.onChange(selectedOption.value);
                              }}
                            />
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                  {postingType === "Flat Percentage" && (
                    <div>
                      <Row>
                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxName">
                              Tax Name<span className="text-danger">*</span>
                            </Label>

                            <Controller
                              id="taxName"
                              name="taxName"
                              control={control}
                              render={({ field }) => (
                                <Input
                                pattern="[a-zA-Z]*"
                                  title="Only Alphabets Allowed"
                                  placeholder="Ex : CGST , SGST , VAT"
                                  required
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null && data.taxName === null,
                                  })}
                                  value={taxName} 
                                  onChange={handleChange}
                                  
                                />
                              )}
                            />
                          </div>
                        </Col>
                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxCode">
                              Tax Code<span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxCode"
                                name="taxCode"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder="Enter Tax Code"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null && data.taxCode === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12">
                          <div className="mb-1">
                            <Label className="form-label" for="appliesFrom">
                              Applies From
                            </Label>
                            <Controller
                              control={control}
                              id="appliesFrom"
                              name="appliesFrom"
                              render={({ field }) => (
                                <Flatpickr
                                  {...field}
                                  options={{ allowInput: true }}
                                  placeholder="YYYY-MM-DD "
                                  required
                                
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null &&
                                      data.appliesFrom === null,
                                  })}
                                />
                              )}
                            />
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="exemptAfter">
                              Exempt After<span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="exemptAfter"
                                name="exemptAfter"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder="Exempt After"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.exemptAfter === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxPercentage">
                              Tax Percentage
                              <span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxPercentage"
                                name="taxPercentage"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9,.]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder="Enter Tax Percentage"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 2,
                                      numeralIntegerScale: 4,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.taxPercentage === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxPlatformId">
                              Tax Platform id
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxPlatformId"
                                name="taxPlatformId"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    placeholder="Tax Platform Id"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 30,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.taxPlatformId === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="note">
                              Note
                            </Label>

                            <Controller
                              id="note"
                              name="note"
                              control={control}
                              placeholder=""
                              render={({ field }) => (
                                <Input
                                  pattern="[aA-zZ]*"
                                  title="Only Alphabets Allowed"
                                  placeholder=""
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null && data.note === null,
                                  })}
                                />
                              )}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {postingType === "Flat Amount" && (
                    <div>
                      <Row>
                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxName">
                              Tax Name<span className="text-danger">*</span>
                            </Label>

                            <Controller
                              id="taxName"
                              name="taxName"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  pattern="[aA-zZ]*"
                                  title="Only Alphabets Allowed"
                                  placeholder="Ex : CGST , SGST , VAT"
                                  required
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null && data.taxName === null,
                                  })}
                                  value={taxName} 
                                  onChange={handleChange}
                                />
                              )}
                            />
                          </div>
                        </Col>
                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxCode">
                              Tax Code<span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxCode"
                                name="taxCode"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder="Enter Tax Code"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null && data.taxCode === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12">
                          <div className="mb-1">
                            <Label className="form-label" for="appliesFrom">
                              Applies From
                            </Label>
                            <Controller
                              control={control}
                              id="appliesFrom"
                              name="appliesFrom"
                              render={({ field }) => (
                                <Flatpickr
                                  {...field}
                                  options={{ allowInput: true }}
                                  placeholder="YYYY-MM-DD "
                                  required
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null &&
                                      data.appliesFrom === null,
                                  })}
                                />
                              )}
                            />
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="exemptAfter">
                              Exempt After<span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="exemptAfter"
                                name="exemptAfter"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder=""
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.exemptAfter === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxAmount">
                              Tax Amount<span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxAmount"
                                name="taxAmount"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder="Enter Tax Amount"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.taxAmount === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxPlatformId">
                              Tax Platform id
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxPlatformId"
                                name="taxPlatformId"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    placeholder=""
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.taxPlatformId === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="note">
                              Note
                            </Label>

                            <Controller
                              id="note"
                              name="note"
                              control={control}
                              placeholder=""
                              render={({ field }) => (
                                <Input
                                  pattern="[aA-zZ]*"
                                  title="Only Alphabets Allowed"
                                  placeholder=""
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null && data.note === null,
                                  })}
                                />
                              )}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {postingType === "SLABS" && (
                    <div>
                      <Row>
                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxName">
                              Tax Name<span className="text-danger">*</span>
                            </Label>

                            <Controller
                              id="taxName"
                              name="taxName"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  pattern="[aA-zZ]*"
                                  title="Only Alphabets Allowed"
                                  placeholder="Ex : CGST , SGST , VAT"
                                  required
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null && data.taxName === null,
                                  })}
                                  value={taxName} 
                                  onChange={handleChange}
                                />
                              )}
                            />
                          </div>
                        </Col>
                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxCode">
                              Tax Code<span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxCode"
                                name="taxCode"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder="Enter Tax Code"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null && data.taxCode === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12">
                          <div className="mb-1">
                            <Label className="form-label" for="appliesFrom">
                              Applies From
                            </Label>
                            <Controller
                              control={control}
                              id="appliesFrom"
                              name="appliesFrom"
                              render={({ field }) => (
                                <Flatpickr
                                  {...field}
                                  options={{ allowInput: true }}
                                  placeholder="YYYY-MM-DD "
                                  required
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null &&
                                      data.appliesFrom === null,
                                  })}
                                />
                              )}
                            />
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="exemptAfter">
                              Exempt After<span className="text-danger">*</span>
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="exemptAfter"
                                name="exemptAfter"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    //required
                                    placeholder=""
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.exemptAfter === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        {/* <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxAmount">
                              Tax Amount
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxAmount"
                                name="taxAmount"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    
                                    placeholder="Enter Tax Amount"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.taxAmount === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col> */}

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="taxPlatformId">
                              Tax Platform id
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="taxPlatformId"
                                name="taxPlatformId"
                                control={control}
                                render={({ field }) => (
                                  <Cleave
                                    {...field}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    placeholder=""
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.taxPlatformId === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>

                        <Col md="4" sm="12" className="mb-1">
                          <div className="mb-1">
                            <Label className="form-label" for="note">
                              Note
                            </Label>

                            <Controller
                              id="note"
                              name="note"
                              control={control}
                              placeholder=""
                              render={({ field }) => (
                                <Input
                                  pattern="[aA-zZ]*"
                                  title="Only Alphabets Allowed"
                                  placeholder=""
                                  {...field}
                                  className={classnames("form-control", {
                                    "is-invalid":
                                      data !== null && data.note === null,
                                  })}
                                />
                              )}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Col md="4" sm="12" className="mb-1">
  <div className="mb-1">
    <Label className="form-label" for="NumberOfSlabs">
      Number of slabs <span className="text-danger">*</span>
    </Label>
    <Controller
      id="NumberOfSlabs"
      name="NumberOfSlabs"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          required
          isClearable
          options={numberofslabs} 
          classNamePrefix="select"
          theme={selectThemeColors}
          className={classnames("react-select", {
            "is-invalid": data !== null && data.NumberOfSlabs === null,
          })}
          onChange={handleNumberOfSlabsChange}
        />
      )}
    />
  </div>
</Col>


                      {[...Array(numberOfSlabs)].map((_, index) => (
                        <div key={index} className="mb-1">
                          <Row>
                            <Col md="3" sm="12" className="mb-1">
                              <div className="mb-1">
                                <Label
                                  className="form-label"
                                  for={`fromamount_${index}`}
                                >
                                  From Amount
                                  <span className="text-danger">*</span>
                                </Label>
                                <InputGroup className="input-group-merge">
                                  <Cleave
                                    id={`fromamount_${index}`}
                                    value={fromAmountValues[index]}
                                    onChange={(e) => {
                                      const newValues = [...fromAmountValues];
                                      newValues[index] = e.target.value;
                                      setFromAmountValues(newValues);
                                    }}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder=""
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.fromamount === null,
                                    })}
                                  />
                                </InputGroup>
                              </div>
                            </Col>

                            <Col md="3" sm="12" className="mb-1">
                              <div className="mb-1">
                                <Label
                                  className="form-label"
                                  for={`toamount_${index}`}
                                >
                                  To Amount
                                  <span className="text-danger">*</span>
                                </Label>
                                <InputGroup className="input-group-merge">
                                  <Cleave
                                    id={`toamount_${index}`}
                                    value={toAmountValues[index]}
                                    onChange={(e) => {
                                      const newValues = [...toAmountValues];
                                      newValues[index] = e.target.value;
                                      setToAmountValues(newValues);
                                    }}
                                    pattern="[0-9]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder=""
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 0,
                                      numeralIntegerScale: 10,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null && data.toamount === null,
                                    })}
                                  />
                                </InputGroup>
                              </div>
                            </Col>
                            {/* Tax Percentage Field */}
                            <Col md="3" sm="12" className="mb-1">
                              <div className="mb-1">
                                <Label
                                  className="form-label"
                                  for={`taxpercentage_${index}`}
                                >
                                  Tax Percentage
                                  <span className="text-danger">*</span>
                                </Label>
                                <InputGroup className="input-group-merge">
                                  <Cleave
                                    id={`taxpercentage_${index}`}
                                    value={taxPercentageValues[index]}
                                    
                                    onChange={(e) => {
                                      const newValues = [
                                        ...taxPercentageValues,
                                      ];
                                      newValues[index] = e.target.value;
                                      setTaxPercentageValues(newValues);
                                    }}
                                    pattern="[0-9,.]*"
                                    title="Only Numbers Allowed"
                                    required
                                    placeholder="Enter Percentage"
                                    options={{
                                      numeral: true,
                                      numeralThousandsGroupStyle: "none",
                                      numeralDecimalScale: 2,
                                      numeralIntegerScale: 4,
                                    }}
                                    className={classnames("form-control", {
                                      "is-invalid":
                                        data !== null &&
                                        data.taxpercentage === null,
                                    })}
                                  />
                                </InputGroup>
                              </div>
                            </Col>
                            {/* Tax Map Field */}
                           


<Col md="3" sm="12" className="mb-1">
      <div className="mb-1">
        <Label className="form-label" for={`taxmap_${index}`}>
          Map <span className="text-danger">*</span>
        </Label>
        <Controller
          id={`taxmap_${index}`}
          name={`taxmap_${index}`}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              isClearable
              onChange={(newValue) => handleTaxMapChange(newValue, index)} // Handle onChange event
              options={taxOptions}
              classNamePrefix="select"
              theme={selectThemeColors}
              className={classnames("react-select", {
                "is-invalid": data !== null && data.taxmap === null,
              })}
            />
          )}
        />
      </div>
    </Col>




                          </Row>
                        </div>
                      ))}
                    </div>
                  )}
                  <Row>
                    <Col md="4" sm="12" className="mb-1">
                      <Button className="me-1" color="primary" type="submit">
                        Submit
                      </Button>
                      <Button outline color="secondary" type="reset">
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Card>
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

      <Card>
        <div className="ag-theme-alpine" style={{ height: 620 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            rowSelection="multiple"
            // onCellClicked={cellClickedListener}
            paginationAutoPageSize="true"
            paginationPageSize="15"
            pagination="true"
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
          />
        </div>
      </Card>
    </div>
  );
};

export default App;
