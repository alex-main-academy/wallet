import Datetime from 'react-datetime';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

const FormikDateTime = ({ field, form, timeFormat }) => {
  const onFieldChange = value => {
    let dateValue = value;

    if (value instanceof moment) {
      dateValue = moment(value).format(DATE_FORMAT);
    }

    form.setFieldValue(field.name, dateValue);
  };

  const onFieldBlur = () => {
    form.setFieldTouched(field.name, true);
  };

  return (
    <Datetime
      dateFormat={DATE_FORMAT}
      timeFormat={timeFormat}
      id={field.name}
      initialValue={new Date()}
      name={field.name}
      onChange={onFieldChange}
      onBlur={onFieldBlur}
    />
  );
};

export default FormikDateTime;
