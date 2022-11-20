import { useSelector, useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/operations';
import { selectContacts, selectFilter } from 'redux/selectors';
import { TiDeleteOutline } from 'react-icons/ti';
import {
  ContactsList,
  Contact,
  Name,
  Number,
  Button,
  Info,
} from './Contacts.styled';

const Contacts = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    return [...contacts].filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const filteredContacts = getFilteredContacts();

  const onBtnClick = id => dispatch(deleteContacts(id));

  return (
    <>
      {filteredContacts.length !== 0 ? (
        <ContactsList>
          {filteredContacts.map(({ id, name, number }) => (
            <Contact key={id}>
              <Name>{name}: </Name>
              <Number>{number}</Number>
              <Button type="button" onClick={() => onBtnClick(id)}>
                <TiDeleteOutline />
              </Button>
            </Contact>
          ))}
        </ContactsList>
      ) : (
        <Info>No contacts in your Phonebook!</Info>
      )}
    </>
  );
};

export default Contacts;
