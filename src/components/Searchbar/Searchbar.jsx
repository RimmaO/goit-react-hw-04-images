import PropTypes from 'prop-types';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button, Form, Header, Input, Span } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      return toast.error('Input is empty');
    }

    onSubmit(value.toLowerCase());
  };

  return (
    <Header className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <Button width="48" height="48" type="submit" className="button">
          <BiSearchAlt size="36" />
          <Span className="button-label">Search</Span>
        </Button>

        <Input
          className="input"
          type="text"
          id="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
