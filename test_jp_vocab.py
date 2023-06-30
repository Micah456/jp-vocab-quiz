import unittest,jp_vocab_server as jp
import pandas as pd

# Server should: start server, load data into dict, send data to web page

class TestServer(unittest.TestCase):
       
    def test_load_data_to_df(self):
        """Test Loading Data to a Dataframe"""
        data = jp.load_data_to_df("data/jlptN4VocabData.xlsx")
        self.assertEqual(type(data), pd.DataFrame)
        self.assertEqual(data.iloc[0,1], "aa")

    def test_load_data_to_dict_array(self):
        """Test Loading Data into a Dictionary """
        data = jp.load_data_to_dictarray("data/jlptN4VocabData.xlsx")
        self.assertEqual(type(data), list)
        self.assertEqual(type(data[0]), dict)
        self.assertEqual(data[0]['Romaji'], "aa")

if __name__ == '__main__':
   
    unittest.main()
        
