import React, { useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import * as THREE from 'three';
import 'bootstrap/dist/css/bootstrap.min.css';

const LEADERBOARD_QUERY = gql`
  query GetLeaderboard($limit: Int) {
    getLeaderboard(limit: $limit) {
      id
      userId
      level
      experiencePoints
      score
      rank
      achievements
      progress
      lastPlayed
      updatedAt
    }
  }
`;

const Leaderboard = () => {
  const { loading, error, data } = useQuery(LEADERBOARD_QUERY);
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || rendererRef.current) return;

    // Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / 400, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create a Rotating Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation Loop
    const animate = () => {
      if (!rendererRef.current) return;
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = containerRef.current.clientWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, 400);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current = null;
      }
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <div ref={containerRef} style={{ width: '100%', height: '400px' }}></div>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data?.getLeaderboard?.map(({ userId, score, rank }) => (
            <tr key={userId}>
              <td>{rank}</td>
              <td>{userId}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
