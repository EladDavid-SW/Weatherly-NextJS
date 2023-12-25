import { useEffect, useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchData, setSearchData] = useState('')
  useEffect(() => {
    console.log(searchData)
  }, [searchData])

  const handleSearchChange = async (event) => {
    const searchText = await event.target.value
    setSearchData(searchText)
  }
  const handleSubmit = () => {
    onSearch(searchData)
  }


  return (
    <div>
      <input type='text' placeholder='Enter city' onChange={handleSearchChange} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}
export default SearchBar
