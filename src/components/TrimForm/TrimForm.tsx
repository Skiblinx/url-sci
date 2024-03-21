import React, { useContext, useState } from 'react';
import { Button, Input, Loader } from '..'; // Import necessary components
import { UserContext } from '../../contexts/UserContext/UserContext';
import copy from 'clipboard-copy';
import { notify, warn } from '../../App';
import axios from 'axios';

const TrimForm: React.FC = () => {
  const [copyMe, setCopyMe] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    long_url: '',
    custom_url: '',
  });
  const { long_url, custom_url } = formFields;
  const [firstUrl, setFirstUrl] = useState('')

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields({ long_url: '', custom_url: '' });
  };


  const handleCopy = () => {
    const urlToCopy = `https://tinyurl.com/${customUrl}`;
    copy(urlToCopy);
    notify('Copied trimmed URL to clipboard!');
    setTimeout(() => {
      setCopyMe(false);
    }, 2500);
  };

  const token = 'meg7j60NfOonw1bnkAH1H6p74GLuj7PlS7QQX1uMUIaGoUDVWKhWgzh3RZX1'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.tinyurl.com/create',
        {
          url: formFields.long_url,
          domain: 'tinyurl.com',
          alias: formFields.custom_url,
          description: 'string',
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        notify('Success, your link has been trimmed!');
        const shortUrl = response.data.url;
        setLoading(false);
        setShortUrl(shortUrl);
        setCustomUrl(formFields.custom_url);
        setTextToCopy(`${shortUrl}/${formFields.custom_url}`);
        setCopyMe(true);
      } else {
        warn('Failed to trim the link, please try again');
        setLoading(false);
      }

      resetFormFields();
    } catch (err) {
      console.error(`An error occurred: ${err}`);
      warn(`An error occurred: ${err}`);
      setLoading(false);
    }
  };

  return (
    <section
      id="analytics"
      className="bg-trim-texture min-h-[40rem] md:min-h-[32.6875rem] flex justify-center"
    >
      <div className="flex">
        {!copyMe && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-xl w-[90%] max-w-[476px] mx-auto my-auto"
          >
            <div className="mb-4">
              <Input
                onChange={handleChange}
                name="long_url"
                py="18px"
                placeholder="Paste long Url here..."
                value={long_url}
                required
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <select
                required
                className="col-span-12 md:col-span-7 border border-[#3284FF] outline-none text-[#3284ff] bg-transparent placeholder:text-[#3284ff]/70 rounded-lg px-6 text-xs font-medium w-full h-[55.5px] md:h-auto"
                value={custom_url}
                onChange={handleChange}
                name="custom_url"
              >
                <option disabled>Choose Domain</option>
                <option value="tinyurl.com">tinyurl.com</option>
              </select>
              <div className="col-span-12 md:col-span-5">
                <Input
                  onChange={handleChange}
                  name="custom_url"
                  py="18px"
                  placeholder="Type Alias here..."
                  value={custom_url}
                  required
                />
              </div>
            </div>
            <Button
              disabled={loading}
              onClick={() => { }}
              buttonWidth="full"
              type='submit'
            >
              <div className="flex justify-center items-center">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <span className="text-sm pt-0.5">Trim URL</span>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition duration-300 -pt-0.5"
                    >
                      {/* SVG code for trim URL icon */}
                    </svg>
                  </>
                )}
              </div>
            </Button>
            <div className="text-[#4991FF] text-sm pt-6">
              By clicking TrimURL, I agree to the{' '}
              <span className="font-medium text-[#3284FF]">
                {' '}
                Terms of Service, Privacy Policy
              </span>{' '}
              and Use of Cookies.
            </div>
          </form>
        )}
        {copyMe && (
          <div className="bg-white p-10 rounded-xl w-[90%] max-w-[476px] mx-auto my-auto">
            <div className="font-medium text-lg mb-4">

            </div>
            <div className="font-medium text-lg mb-2">
              Your Shortened URL is:{' '}
              <a href={`https://tinyurl.com/${customUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary">
                https://tinyurl.com/{customUrl}
              </a>
            </div>

            <Button onClick={handleCopy} buttonWidth="full">
              <div className="flex justify-center items-center">
                <span className="text-sm pt-0.5 mr-2">Copy URL</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  role="graphics-document"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG code for copy URL icon */}
                </svg>
              </div>
            </Button>
          </div>
        )}

      </div>
    </section>
  );
};

export default TrimForm;
