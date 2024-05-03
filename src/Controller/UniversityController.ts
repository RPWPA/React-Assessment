import { University } from "../Models/University";
import _ from 'lodash';

export async function fetchUniversityData(): Promise<any[]> {
    try {
      const response = await fetch('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
      if (!response.ok) {
          return []
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be handled by the component
    }
  }

  // Function to sort universities alphabetically
export function sortUniversities(universities: University[], sortCriteria: string){
  if (sortCriteria === 'asc') {
    return [...universities].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortCriteria === 'desc') {
    return [...universities].sort((a, b) => b.name.localeCompare(a.name));
  }
  return universities;
};

  // Create a debounced function
  export function filterUniversities(universities: University[], filterQuery: string, sortCriteria: string){
      return(sortUniversities([...universities.filter(u => u.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1)], sortCriteria));
  } 

  export function deleteUniversity(universities: University[], universityName: string){
    return universities.filter(u => u.name !== universityName);
  }