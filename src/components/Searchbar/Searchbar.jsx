import { HeaderSearchBar, FormSearchBar, BtnSearch, BtnLabel, Input } from "./Searchbar.styled";
import React, {useState } from "react";
import searchIcon from '../../search_icon/searh_icon.png'


const Searchbar = ({ onFind }) => {
const [input, setInput] = useState('');

const onChange = (e) => {
  const { value } = e.target;
  setInput(value);
};

const onSubmit = (e) => {
  e.preventDefault();
      if (input.length === 0) return;
      onFind(input);
}

return (
    <HeaderSearchBar>
      <FormSearchBar onSubmit={onSubmit}>
        <BtnSearch type="submit"
        style={{ backgroundImage: `url(${searchIcon})` }}>
          <BtnLabel>Search</BtnLabel>
        </BtnSearch>
        <Input
        name="input"
        type="text"
        autocomplete="off"
        autoFocus
    placeholder="Search images and photos"
        value={input}
        onChange={onChange}/>
      </FormSearchBar>
    </HeaderSearchBar>
  )
}

export default Searchbar;


