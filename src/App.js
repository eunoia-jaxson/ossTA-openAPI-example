import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SalesDataTable from "./SalesDataTable";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 페이지당 표시할 데이터 개수

  // 날짜 포맷 함수 (YYYYMMDD 형식으로 변환)
  const getCurrentDate = () => {
    // 현재 날짜 - 1를 가져와서 YYYYMMDD 형식으로 변환
    const date = new Date(Date.now() - 86400000);
    // const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      const currentDate = getCurrentDate(); // 현재 날짜를 가져옴
      const serviceKey = process.env.REACT_APP_MARKET_PRICE_API_KEY; // 환경변수에서 API 키를 가져옴
      // 1부터 40까지 랜덤 넘버 생성
      const randomPage = Math.floor(Math.random() * 40) + 1;
      const url = `https://apis.data.go.kr/1192000/select0030List/getselect0030List?serviceKey=${serviceKey}&numOfRows=100&pageNo=${randomPage}&type=xml&baseDt=${currentDate}&fromDt=${currentDate}&toDt=${currentDate}`;

      try {
        const response = await axios.get(url);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");

        const items = xmlDoc.getElementsByTagName("item");
        const itemArray = [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const csmtDe = item.getElementsByTagName("csmtDe")[0].textContent;
          const mxtrCode = item.getElementsByTagName("mxtrCode")[0].textContent;
          const mxtrNm = item.getElementsByTagName("mxtrNm")[0].textContent;
          const csmtmktCode =
            item.getElementsByTagName("csmtmktCode")[0].textContent;
          const csmtmktNm =
            item.getElementsByTagName("csmtmktNm")[0].textContent;
          const fshrCode = item.getElementsByTagName("fshrCode")[0].textContent;
          const fshrNm = item.getElementsByTagName("fshrNm")[0].textContent;
          const prchasNo = item.getElementsByTagName("prchasNo")[0].textContent;
          const prchasSn = item.getElementsByTagName("prchasSn")[0].textContent;
          const mprcStdCode =
            item.getElementsByTagName("mprcStdCode")[0].textContent;
          const mprcStdCodeNm =
            item.getElementsByTagName("mprcStdCodeNm")[0].textContent;
          const csmtQy = item.getElementsByTagName("csmtQy")[0].textContent;
          const csmtWt = item.getElementsByTagName("csmtWt")[0].textContent;
          const csmtUnqt = item.getElementsByTagName("csmtUnqt")[0].textContent;
          const csmtUntpc =
            item.getElementsByTagName("csmtUntpc")[0].textContent;
          const csmtAmount =
            item.getElementsByTagName("csmtAmount")[0].textContent;
          const kdfshSttusCode =
            item.getElementsByTagName("kdfshSttusCode")[0].textContent;
          const kdfshSttusNm =
            item.getElementsByTagName("kdfshSttusNm")[0].textContent;
          const goodsStndrdCode =
            item.getElementsByTagName("goodsStndrdCode")[0].textContent;
          const goodsStndrdNm =
            item.getElementsByTagName("goodsStndrdNm")[0].textContent;
          const goodsUnitCode =
            item.getElementsByTagName("goodsUnitCode")[0].textContent;
          const goodsUnitNm =
            item.getElementsByTagName("goodsUnitNm")[0].textContent;
          const orgplceSeCode =
            item.getElementsByTagName("orgplceSeCode")[0].textContent;
          const orgplceSeNm =
            item.getElementsByTagName("orgplceSeNm")[0].textContent;

          // 객체로 만들어 배열에 추가
          itemArray.push({
            csmtDe,
            mxtrCode,
            mxtrNm,
            csmtmktCode,
            csmtmktNm,
            fshrCode,
            fshrNm,
            prchasNo,
            prchasSn,
            mprcStdCode,
            mprcStdCodeNm,
            csmtQy,
            csmtWt,
            csmtUnqt,
            csmtUntpc,
            csmtAmount,
            kdfshSttusCode,
            kdfshSttusNm,
            goodsStndrdCode,
            goodsStndrdNm,
            goodsUnitCode,
            goodsUnitNm,
            orgplceSeCode,
            orgplceSeNm,
          });
        }

        setData(itemArray);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data
    ? data.filter((item) =>
        item.mprcStdCodeNm.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // 검색어 업데이트
    setCurrentPage(1); // 페이지 초기화
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // 검색어 초기화
    setCurrentPage(1); // 페이지 초기화
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Background>
      <Header>
        <Title>해양수산부 - 일자별 위탁판매 현황 API</Title>
        <SearchContainer>
          <SearchField
            type="text"
            placeholder="물품명 검색"
            value={searchTerm}
            onChange={handleSearch}
          />
          <SearchIcon
            onClick={searchTerm ? handleClearSearch : null}
            enable={searchTerm}
          >
            <FontAwesomeIcon icon={searchTerm ? faTimes : faSearch} />
          </SearchIcon>
        </SearchContainer>
      </Header>
      <SalesDataTable
        data={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        searchTerm={searchTerm}
      />
    </Background>
  );
}

export default App;

const Background = styled.div`
  background-color: white;
  color: black;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchField = styled.input`
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #ccc;
  cursor: ${(props) => (props.enable.length !== 0 ? "pointer" : "default")};
`;
