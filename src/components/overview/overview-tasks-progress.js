import PropTypes from 'prop-types';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';

export const RatingProgress = (props) => {
  const { rating, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Rating
            </Typography>
            <Typography variant="h4">
              {rating/5 * 100}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <StarRateRoundedIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={(rating / 5) * 100} 
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

RatingProgress.propTypes = {
  rating: PropTypes.number.isRequired,
  sx: PropTypes.object
};
