import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const tabStyles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    transitionBox: {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        height: "auto",
        position: "relative",
    },
};

// Inject CSS once
const style = `
.fade-slide {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  position: absolute;
  width: 100%;
}
.fade-slide.left {
  transform: translateX(-50px);
}
.fade-slide.active {
  opacity: 1;
  transform: translateX(0);
  position: relative;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.image-modal-content {
  background: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
}
  .image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 10px;
}
 .image-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  cursor: pointer;
}
 .image-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
  .table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
  animation: fadeIn 0.5s ease;
}

 .data-table {
  width: 100%;
  border-collapse: collapse;
  background: #1e2127;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
}

 .data-table th,
 .data-table td {
  padding: 12px 16px;
  text-align: left;
  font-size: 0.95rem;
}

 .data-table thead {
  background: #262a31;
  color: #ffffff;
  font-weight: 600;
}

 .data-table tbody tr {
  border-top: 1px solid #2a2d32;
  transition: background 0.2s ease;
  color: #ffffff;
}
 .data-table tbody tr:hover {
  background: #292d36;
}
`;

function Pop({ id }) {
    const navigate = useNavigate();
    // const { id } = useParams();

    const [detailData, setDetailData] = useState(null);
    const [selectedTab, setSelectedTab] = useState("images");
    const [image, setImage] = useState([]);
    const [details, setDetails] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [station_name, setStation_name] = useState([]);

    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = style;
        document.head.appendChild(styleEl);
        return () => document.head.removeChild(styleEl);
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(`https://testhotel2.prysmcable.com/v27/completed_kptcl_surveys`).then(r => r.json()),
                    // fetch(`https://testhotel2.prysmcable.com/v27/get_station/${id}`).then(r => r.json()),
                    Promise.all(
                        id.map(id => fetch(`https://testhotel2.prysmcable.com/v27/get_station/${id}`).then(r => r.json()))
                    )
                ]);
                // if (res2 && res2.data && res2.data.length > 0) {
                // const datas = res2.data.map((data) => data.slno)
                const allStationData = res2.flatMap(r => (r.data || []).map(d => d.slno));
                setStation_name(allStationData)
                console.log(allStationData)
                // }
                if (res1 && res1.data && res1.data.length > 0) {
                    setDetailData(res1);
                } else {
                    setDetailData(null);
                }
            } catch (err) {
                console.error('Error:', err);
                setDetailData(null);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {
        if (!detailData || !Array.isArray(id) || id.length === 0) return;

        // Get matched details by array of ids
        const matchedDetails = detailData.data.filter(item => id.includes(item.slno));
        if (matchedDetails.length === 0) {
            setImage([]);
            setDetails([]);
            return;
        }

        // Collect images from all matching station_name items
        const datas = detailData.data.filter(item => station_name.includes(item.slno));
        const stationImages = [];
        const seenStationImageIds = new Set();

        datas?.forEach((item) => {
            item?.images?.forEach((img) => {
                if (img.image_type === 2 && !seenStationImageIds.has(img.id)) {
                    seenStationImageIds.add(img.id);
                    stationImages.push(img);
                }
            });
        });

        // Collect and deduplicate images from matchedDetails
        const allDetailImages = [];
        const seenDetailImageIds = new Set();

        matchedDetails.forEach((item) => {
            item?.images?.forEach((img) => {
                if (!seenDetailImageIds.has(img.id)) {
                    seenDetailImageIds.add(img.id);
                    allDetailImages.push(img);
                }
            });
        });

        // Combine and deduplicate both station and detail images
        const combinedImages = [...stationImages, ...allDetailImages];
        const uniqueImages = Array.from(
            new Map(combinedImages.map(img => [img.id, img])).values()
        );

        console.log(uniqueImages, '%%%');
        setImage(uniqueImages);
        setDetails(matchedDetails);
    }, [detailData, id]);

    const openModal = (url) => setSelectedImage(url);
    const closeModal = () => setSelectedImage(null);

    if (!detailData || !details || details.length === 0) {
        return <p>Loading or no data found...</p>;
    }

    const renderImageGrid = (title, images) => (
        <div style={{ marginBottom: "30px" }}>
            <h3 style={{ textAlign: "center", margin: "10px" }}>{title}</h3>
            {images.length > 0 ? (
                <div className="image-grid">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className='image-card'
                            onClick={() => openModal(`https://testhotel2.prysmcable.com/v24/images/${img.url}`)}
                        >
                            <img
                                src={`https://testhotel2.prysmcable.com/v24/images/${img.url}`}
                                alt={`Image ${idx + 1}`}
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: "center", color: "#888" }}>No images available</p>
            )}
        </div>
    );

    const renderTable = (title, meters, headers, getRowData) => (
        <div style={{ marginBottom: "30px" }}>
            <h3 style={{ textAlign: "center", margin: "10px" }}>{title}</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        {headers.map((header, i) => <th key={i}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {meters.map((meter, idx) => (
                        <tr key={idx}>
                            {getRowData(meter).map((val, i) => (
                                <td key={i}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div style={tabStyles.container}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 onClick={() => navigate(-1)} style={{ cursor: "pointer" }}></h4>
                <h2 style={{ textAlign: "center" }}>Survey Details Slno - {id.join(",")}</h2>
                <span />
            </div>

            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "50px",
                        padding: "5px",
                        gap: "5px",
                        position: "relative",
                    }}
                >
                    {["images", "data"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            style={{
                                padding: "10px 25px",
                                borderRadius: "50px",
                                border: "none",
                                backgroundColor: selectedTab === tab ? "#4DD0E1" : "transparent",
                                color: selectedTab === tab ? "#fff" : "#333",
                                fontSize: "16px",
                                fontWeight: selectedTab === tab ? "bold" : "normal",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {tab === "images" ? "Images" : "Meter Data"}
                        </button>
                    ))}
                </div>
            </div>

            <div style={tabStyles.transitionBox}>
                <div className={`fade-slide ${selectedTab === 'images' ? 'active left' : ''}`} style={{ display: selectedTab === 'images' ? 'block' : 'none' }}>
                    {image?.some(img => img.image_type === 2) &&
                        renderImageGrid("Station Images", image.filter(img => img.image_type === 2))}

                    {image?.some(img => img.image_type === 1) &&
                        renderImageGrid("Feeder Images", image.filter(img => img.image_type === 1))}
                </div>

                <div className={`fade-slide ${selectedTab === 'data' ? 'active' : ''}`} style={{ display: selectedTab === 'data' ? 'block' : 'none' }}>
                    {details.length > 0 ? (
                        renderTable("Station Info", details,
                            ["Slno", "remark", "meter_no", "meter_make", "feeder_name", "feeder_type", "completed_at"],
                            (meter) => [
                                meter.slno,
                                meter.remarks,
                                meter.meter_no,
                                meter.meter_make,
                                meter.feeder_name,
                                meter.feeder_type == null ? "UNKNOWN" : meter.feeder_type,
                                meter.completed_at
                            ])
                    ) : (
                        <h4 style={{ textAlign: 'center' }}>No Data Found...!</h4>
                    )}
                </div>
            </div>

            {selectedImage && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Large View" style={{ width: '100%', height: '600px' }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pop;
