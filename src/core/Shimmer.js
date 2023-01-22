import { Grid, Box, Typography, Skeleton } from "@mui/material";

const Shimmer = (props) => {
  const { loading = false } = props;
  return (
    <div className="shimmerContainer">
      <Grid container wrap="nowrap">
        {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "400px",
              height: "350px",
              borderRadius: "15px",
              marginRight: 1,
              my: 5,
            }}
          >
            {item ? (
              <img
                style={{ width: 400, height: 200 }}
                alt={item.title}
                src={item.src}
              />
            ) : (
              <Skeleton variant="rectangular" width={400} height={200} />
            )}

            {item ? (
              <Box sx={{ pr: 2 }}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography
                  display="block"
                  variant="caption"
                  color="text.secondary"
                >
                  {item.channel}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`${item.views} • ${item.createdAt}`}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    </div>
  );
};

export default Shimmer;
