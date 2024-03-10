//
// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Dashboard from './dashboard.tsx';
//
//
// describe('Dashboard Component', () => {
//     it('renders the dashboard with favorites', () => {
//         const favorites = [
//             { id: 1, title: 'Favorite 1', url: 'https://example.com/image1.jpg' },
//             { id: 2, title: 'Favorite 2', url: 'https://example.com/image2.jpg' },
//         ];
//
//         render(
//             <Router>
//                 <Dashboard favorites={favorites} />
//             </Router>
//         );
//
//         expect(screen.getByText('Dashboard')).toBeInTheDocument();
//         expect(screen.getByText('Go to List')).toBeInTheDocument();
//
//         favorites.forEach(favorite => {
//             expect(screen.getByText(favorite.title)).toBeInTheDocument();
//         });
//     });
//
//     it('renders the dashboard without favorites', () => {
//         render(
//             <Router>
//                 <Dashboard favorites={[]} />
//             </Router>
//         );
//
//         expect(screen.getByText('Dashboard')).toBeInTheDocument();
//         expect(screen.getByText('Go to List')).toBeInTheDocument();
//         expect(screen.queryByTestId('list-item')).toBeNull();
//     });
// });
