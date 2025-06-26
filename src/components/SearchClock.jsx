import React, { useState } from 'react';
import styled from 'styled-components';
import useClockStore from '../store/clockStore';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  margin: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px 0 rgba(31, 38, 135, 0.47);
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.8);
  font-size: 1.6rem;
  
  &:focus {
    outline: none;
    border-color: #2270e4;
    box-shadow: 0 0 0 2px rgba(34, 112, 228, 0.2);
  }
`;

const Button = styled.button`
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  margin-top: 1rem;
  background: linear-gradient(135deg, #2270e4 0%, #22e4c7 100%);
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(34, 112, 228, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.p`
  color: #ff6767;
  font-size: 1.4rem;
  margin-top: 1rem;
  font-family: 'Arial', sans-serif;
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const SearchClock = ({ onAddClock }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!search.trim()) {
      setError('Please enter a valid city or timezone.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // 使用 WorldTimeAPI 获取时区信息
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${encodeURIComponent(search)}`);
      
      if (!response.ok) {
        // 如果找不到精确匹配，尝试获取可用时区列表并进行模糊匹配
        const allTimezonesResponse = await fetch('https://worldtimeapi.org/api/timezone');
        const allTimezones = await allTimezonesResponse.json();
        
        // 简单的模糊匹配，查找包含搜索词的时区
        const matchedTimezones = allTimezones.filter(tz => 
          tz.toLowerCase().includes(search.toLowerCase())
        );
        
        if (matchedTimezones.length > 0) {
          // 使用第一个匹配的时区
          const matchedResponse = await fetch(`https://worldtimeapi.org/api/timezone/${matchedTimezones[0]}`);
          if (matchedResponse.ok) {
            const data = await matchedResponse.json();
            setSearchResult({
              timezone: matchedTimezones[0],
              offset: parseFloat(data.utc_offset.replace(':', '.')) || 0,
              datetime: data.datetime
            });
          } else {
            throw new Error('Unable to fetch matched timezone data');
          }
        } else {
          throw new Error('Cannot find timezone for the given input');
        }
      } else {
        const data = await response.json();
        setSearchResult({
          timezone: search.split('/').pop(),
          offset: parseFloat(data.utc_offset.replace(':', '.')) || 0,
          datetime: data.datetime
        });
      }
    } catch (err) {
      setError('Failed to fetch timezone data. Please check your input or retry.(Eg: Europe/London, Asia/Shanghai)');
      console.error('Timezone API error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddClock = () => {
    if (searchResult) {
      onAddClock(searchResult.timezone, searchResult.offset);
      setSearch('');
      setSearchResult(null);
    }
  };
  
  return (
    <SearchContainer>
      <Title>Find World Clock</Title>
      <SearchForm onSubmit={handleSearch}>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Country/City (Eg: Asia/Shanghai, Europe/London)"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Searching Timezone'}
        </Button>
      </SearchForm>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <ResultContainer visible={!!searchResult}>
        {searchResult && (
          <>
            <p>Timezone: {searchResult.timezone}</p>
            <p>UTC Offset: {searchResult.offset}</p>
            <Button onClick={handleAddClock}>Add Clock</Button>
          </>
        )}
      </ResultContainer>
    </SearchContainer>
  );
};

export default SearchClock;