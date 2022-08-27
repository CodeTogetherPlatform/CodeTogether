import React from 'react'
// import Button from '@mui/material/Button';
import { Box, Card } from '@mui/material'
import { Typography } from '@mui/material'

interface ProblemBoxProps {};

type ProblemBoxComponent = (props: ProblemBoxProps) => JSX.Element;

export const ProblemBox: ProblemBoxComponent = () => {
  return (
    <Card>
      <Box p={2}>
        <Typography> Problem: Two Sum</Typography>
        <Typography> Difficulty: Easy</Typography>
        <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

        You may assume that each input would have exactly one solution, and you may not use the same element twice.

        You can return the answer in any order.</p>
      </Box>
    </Card>
  )
}