import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function DateTimeContainer() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker 
        label="Select Date and Time"
        views={['year', 'month', 'day', 'hours']}
      />
    </LocalizationProvider>
  );
}

export default DateTimeContainer;