// import {FaSearch} from 'react-icons/fa';

const SearchInput = ({searchText, setSearchText}) => {
    const handleSearchText = (e) => {
        setSearchText(e.target.value)
    }
    return (
        <form className="d-flex justify-content-center my-3">
            <span>
            {/*<FaSearch className='form-control-feedback '/>*/}
            </span>
            <input type="text"
                   value={searchText} onChange={handleSearchText}
                   className="form-control w-auto my-2 rounded-0"
                   placeholder="Search jobs..."/>
        </form>
    )
}
export default SearchInput