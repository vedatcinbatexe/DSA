/*
Description
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).


Output Examples:
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.


*/

function kClosest(points: number[][], k: number): number[][] {
    let closestPoints: number[][] = []
    let distances: number[][] = []

    for(let i = 0; i < points.length; i++) {
        const distance = Math.sqrt(Math.pow(points[i][0], 2) + Math.pow(points[i][1], 2));
        distances.push([i, distance])
    }

    distances.sort((x, y) => x[1] - y[1]);
    distances.slice(0, k).forEach((point) => {
        closestPoints.push(points[point[0]])
    })


    return closestPoints;
};

const points = [[3,3], [7,24], [5,-1], [3,4], [-2,4]] 

const k = 2

const response = kClosest(points, k);

console.log(response);