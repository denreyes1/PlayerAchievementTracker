import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import * as THREE from 'three';

const LEADERBOARD_QUERY = gql`
  query GetLeaderboard {
    leaderboard {
      userId
      score
      rank
    }
  }
`;

const Leaderboard = () => {
  const { loading, error, data } = useQuery(LEADERBOARD_QUERY);

  useEffect(() => {
    const container = document.getElementById('threejs-container');
    if (!container) return; // Ensure the container exists

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <div id="threejs-container" style={{ width: '100%', height: '400px' }}></div>
      <ul>
        {data.leaderboard.map(({ userId, score, rank }) => (
          <li key={userId}>
            Rank {rank}: User {userId} - Score: {score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;