import debounce from 'lodash/debounce';
import { AutoComplete, Button } from 'antd';
import { useApi } from '../../hooks/useApi';
import { SearchResult } from '../../types';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants';
import styles from './index.module.css';
interface IOption {
  value: string;
  label: ReactNode;
}

const Search = () => {
  const navigate = useNavigate();
  const { search, updateToken } = useApi();
  const [continentsOptions, setContinentsOptions] = useState<IOption[]>([]);
  const [countriesOptions, setCountriesOptions] = useState<IOption[]>([]);
  const [languagesOptions, setLanguagesOptions] = useState<IOption[]>([]);

  const renderTitle = (title: string) => <span>{title}</span>;
  const renderItem = (name: string) => ({
    value: name,
    label: <div className={styles.autocompleteOption}>{name}</div>,
  });

  const options = [
    {
      label: continentsOptions.length > 0 && renderTitle('Continents'),
      options: continentsOptions,
    },
    {
      label: countriesOptions.length > 0 && renderTitle('Countries'),
      options: countriesOptions,
    },
    {
      label: languagesOptions.length > 0 && renderTitle('Languages'),
      options: languagesOptions,
    },
  ];

  const prepareSearchResponse = (responseData: SearchResult) => {
    const createOptions = (data: any[], setOptions: (options: IOption[]) => void) => {
      const options: IOption[] = data.map((el) => renderItem(el.name));
      setOptions(options);
    };

    createOptions(responseData.continents || [], setContinentsOptions);
    createOptions(responseData.countries || [], setCountriesOptions);
    createOptions(responseData.languages || [], setLanguagesOptions);
  };

  const handleSearch = async (value: string) => {
    const response = await search(value);
    if ('error' in response) {
      await updateToken();
      const newResponse = await search(value);
      !('error' in newResponse) && prepareSearchResponse(newResponse);
    } else {
      prepareSearchResponse(response);
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate(LOGIN_ROUTE);
  };

  return (
    <div className={styles.container}>
      <Button className={styles.logOut} onClick={logOut}>
        Log out
      </Button>
      <AutoComplete
        className={styles.autoCompleteContainer}
        onSearch={debounce(handleSearch, 300)}
        placeholder="Input here"
        allowClear
        options={options}
      />
    </div>
  );
};

export default Search;
