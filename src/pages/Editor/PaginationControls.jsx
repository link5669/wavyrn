const renderPaginationControls = (
  currentPage,
  totalPages,
  handlePageChange,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          margin: "0 5px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          style={{
            backgroundColor: currentPage === pageNum ? "#007bff" : "#f8f9fa",
            color: currentPage === pageNum ? "white" : "#007bff",
            padding: "8px 12px",
            border: "1px solid #007bff",
            borderRadius: "4px",
            margin: "0 2px",
            cursor: "pointer",
          }}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          margin: "0 5px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </button>

      <div style={{ marginTop: "10px", color: "#666" }}>
        Page {currentPage} of {totalPages} | Showing {indexOfFirstItem + 1}-
        {Math.min(indexOfLastItem, totalItems)} of {totalItems} items
      </div>
    </div>
  );
};

export default renderPaginationControls
