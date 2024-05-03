import React from 'react';
import { render, within, fireEvent, waitFor, getByText } from '@testing-library/react';
import App from './App';
import * as UniversityController from './Controller/UniversityController';

// Mocking the fetchUniversityData function
jest.mock('./Controller/UniversityController', () => ({
  fetchUniversityData: jest.fn(),
  filterUniversities: jest.fn(),
  deleteUniversity: jest.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    // Mock fetchUniversityData to resolve with some dummy data
    const dummyData = [{ name: 'University 1' }, { name: 'University 2' }];
    (UniversityController.fetchUniversityData as jest.Mock).mockResolvedValue(dummyData);

    // Render the App component
    const { getByText } = render(<App />);

    // Check if the component renders successfully
    expect(getByText('Universities')).toBeInTheDocument();

    // Check if fetchUniversityData is called
    await waitFor(() => expect(UniversityController.fetchUniversityData).toHaveBeenCalledTimes(1));
  });

  test('displays error message when unable to retrieve items', async () => {
  // Mock fetchUniversityData to resolve with an empty array
  (UniversityController.fetchUniversityData as jest.Mock).mockResolvedValue([]);

  // Render the App component
  const { getByText } = render(<App />);

  // Wait for the component to finish rendering
  await waitFor(() => {
    expect(UniversityController.fetchUniversityData).toHaveBeenCalled();
  });

  // Check if error message is displayed
  expect(getByText('Unable to retrieve items')).toBeInTheDocument();  });
  
});
