import { minWidth } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const GameLogsTable = ({ gameLogs, columnDefs }) => {
  const columns = [
    {
      key: 'date',
      headerName: 'Date',
      minWidth: 200,
    },
    {
      key: 'opponent',
      headerName: 'Opponent',
      minWidth: 200,
    },
    {
      key: 'pass_yds',
      headerName: 'Passing Yards',
      minWidth: 200,
    },
  ];

  const rows = [
    {
      id: 1,
      date: '2024-09-01',
      opponent: 'DAL',
      pass_yds: 300,
    },
    {
      id: 2,
      date: '2024-09-08',
      opponent: 'NYG',
      pass_yds: 200,
    },
    {
      id: 3,
      date: '2024-09-15',
      opponent: 'PHI',
      pass_yds: 400,
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default GameLogsTable;
