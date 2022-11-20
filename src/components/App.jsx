import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import Section from './Section';
import Form from './Form';
import Filter from './Filter';
import Contacts from './Contacts';

export const App = () => {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>
      <div>
        {isLoading && <p>Loading contacts...</p>}
        {error && <p>{error}</p>}
      </div>
      <Section title="Contacts">
        <Filter />
        <Contacts />
      </Section>
    </>
  );
};
