import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectIsLoading, selectError } from 'redux/selectors';
import Section from './Section';
import Form from './Form';
import Filter from './Filter';
import Contacts from './Contacts';

export const App = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isContacts = !isLoading && !error;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>
      {isLoading && <Section>Loading contacts...</Section>}
      {error && <Section>{error}</Section>}
      {isContacts && (
        <Section title="Contacts">
          <Filter />
          <Contacts />
        </Section>
      )}
    </>
  );
};
