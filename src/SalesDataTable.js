import React from "react";
import styled from "styled-components";

// Main React component
const SalesDataTable = ({
  data,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>일자</TableHeader>
            <TableHeader>매출처 이름</TableHeader>
            <TableHeader>수협 이름</TableHeader>
            <TableHeader>구매 번호</TableHeader>
            <TableHeader>구매 순번</TableHeader>
            <TableHeader>판매 물품명</TableHeader>
            <TableHeader>판매 단량</TableHeader>
            <TableHeader>상품 단위명</TableHeader>
            <TableHeader>판매 단가</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableData>{item.csmtDe}</TableData>
              <TableData>{item.mxtrNm}</TableData>
              <TableData>{item.csmtmktNm}</TableData>
              <TableData>{item.prchasNo}</TableData>
              <TableData>{item.prchasSn}</TableData>
              <TableData>{item.mprcStdCodeNm}</TableData>
              <TableData>{Number(item.csmtUnqt).toLocaleString()}</TableData>
              <TableData>{item.goodsUnitNm}</TableData>
              <TableData>
                {Number(item.csmtUntpc).toLocaleString()} 원
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {/* 페이지네이션 UI */}
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </PageButton>
        <PageInfo>
          {currentPage} / {totalPages}
        </PageInfo>
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </PageButton>
      </Pagination>
    </>
  );
};

export default SalesDataTable;

// Styled-components for table
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1em;
  font-family: "Arial", sans-serif;
  text-align: left;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dddddd;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f4f4f4;
  font-weight: bold;
  border-top: 1px solid #dddddd;
`;

const TableData = styled.td`
  padding: 12px;
`;

// Styled-components for pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  border: 1px solid #1976d2; /* MUI primary color */
  background-color: white;
  color: #1976d2;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #1976d2;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    border-color: rgba(25, 118, 210, 0.5); /* Disabled border */
    color: rgba(25, 118, 210, 0.5); /* Disabled text color */
  }
`;

const PageInfo = styled.div`
  padding: 10px 20px;
  color: #1976d2; /* MUI primary color */
`;
