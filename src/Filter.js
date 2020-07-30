import React from 'react'

const Filter = ({ searchTerm, handleSearchInput }) => {
  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="search..."
      />
    </div>
  )
}

export default Filter
