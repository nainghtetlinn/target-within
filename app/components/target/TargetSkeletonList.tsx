import { Skeleton, Grid } from '@mui/material'

const TargetSkeletonList = () => {
  return (
    <>
      <Grid
        container
        columns={{ xs: 1, md: 2 }}
        columnSpacing={{ md: 2 }}
        rowSpacing={{ xs: 2 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <Grid
            item
            xs={1}
            key={i}
          >
            <Skeleton
              variant='rounded'
              height={80}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default TargetSkeletonList
