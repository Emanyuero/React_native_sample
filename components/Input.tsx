import { TextInput } from 'react-native';

export default function Input(props) {
  return (
    <TextInput
      className="border border-gray-300 p-4 rounded-xl bg-white text-gray-800"
      {...props}
    />
  );
}
