import Section from './Section';
import Form from './Form';
import Filter from './Filter';
import Contacts from './Contacts';

export const App = () => {
  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>
      <Section title="Contacts">
        <Filter />
        <Contacts />
      </Section>
    </>
  );
};
