import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { StyledForm, FormLabel, FormInput, SubmitButton } from './Form.styled';

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const onFormSubmitHandle = e => {
    e.preventDefault();

    const isInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isInContacts) return alert(`${name} is already in your contacts!`);

    dispatch(addContacts({ name, number }));
    resetForm();
  };

  const onInputChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        console.log('There is no such option');
        return;
    }
  };

  return (
    <StyledForm onSubmit={onFormSubmitHandle}>
      <FormLabel htmlFor={nameInputId}>Name</FormLabel>
      <FormInput
        type="text"
        name="name"
        id={nameInputId}
        value={name}
        onChange={onInputChange}
        placeholder="Enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <FormLabel htmlFor={numberInputId}>Number</FormLabel>
      <FormInput
        type="tel"
        name="number"
        id={numberInputId}
        value={number}
        onChange={onInputChange}
        placeholder="Enter phone number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <SubmitButton type="submit">Add contact</SubmitButton>
    </StyledForm>
  );
};

export default Form;
