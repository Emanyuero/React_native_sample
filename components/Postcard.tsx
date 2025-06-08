import { Text, View } from 'react-native';

export default function PostCard({ post }) {
  if (!post) return <Text className="text-red-500">No post data!</Text>;

  return (
    <View className="border rounded-xl p-4 mb-3 bg-white">
      <Text className="font-bold text-lg">{post.title || 'Untitled'}</Text>
      <Text>{post.body || 'No content'}</Text>
    </View>
  );
}
