import * as React from 'react';
import { CellProps } from 'react-table';

// Create an editable cell renderer
export const EditableCell = ({
  value,
  row: { index },
  column: { id },
  updateTableData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value2, setValue] = React.useState(value);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => updateTableData(index, id, value2);

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(value);
  }, [value]);

  return <input value={value2} onChange={onChange} onBlur={onBlur} />;
};

