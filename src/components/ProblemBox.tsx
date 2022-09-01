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
        <Typography> Problem: Five Sum</Typography>
        <Typography> Difficulty: Very Easy</Typography>
        <p>Given an array of integers that can be positive or negative and an integer target, return indices of five numbers such that they add up to target.</p>

        <p>You may assume that each input might have multiple solutions, and you may not use the same element twice.</p>

        <p>Return all solutions as a nested array.</p>
        
        <p>Challenge: Achieve this in O(N) time complexity and O(1) space complexity.</p>
      </Box>
    </Card>
  )
}