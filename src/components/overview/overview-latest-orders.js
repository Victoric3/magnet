import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { SeverityPill } from './severity-pill';
import { Scrollbar } from './scrollbar'

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const customScrollbarStyles = {
    height: '100%',
    '& .simplebar-content': {
      height: '100%',
      paddingRight: '5px',
    },
    '& .simplebar-scrollbar:before': {
      background: 'neutral.400',
      borderRadius: '4px', 
    },
  };
  const { orders = [], sx } = props;

  return (
    // <div sx={{...customScrollbarStyles}}>
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
        <Scrollbar sx={{maxHeight: '422px'}}>
      <Box sx={{ 
        minWidth: 800, 
        overflow: 'auto',
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.ref}
                    </TableCell>
                    <TableCell>
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
      </Box>
          </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          >
          View all
        </Button>
      </CardActions>
    </Card>
          // </div>

  );
};

OverviewLatestOrders.propTypes = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
