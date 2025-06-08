import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

type Post = {
  id: string;
  username: string;
  avatar: string;
  time: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
};

const initialPosts: Post[] = [
  {
    id: '1',
    username: 'john_doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    time: '2h ago',
    image: 'https://picsum.photos/id/1011/400/300',
    caption: 'What a beautiful day!',
    likes: 23,
    comments: 5,
  },
  {
    id: '2',
    username: 'jane_smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    time: '4h ago',
    image: 'https://picsum.photos/id/1015/400/300',
    caption: 'Loving this view!',
    likes: 45,
    comments: 12,
  },
];

export default function ExploreScreen() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const isLoggedIn = false; // 🔐 Replace with actual login check

  const toggleLike = (postId: string) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const loadMorePosts = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextId = (posts.length + 1).toString();
      const newPost: Post = {
        id: nextId,
        username: 'new_user',
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        time: 'Just now',
        image: 'https://picsum.photos/id/1020/400/300',
        caption: 'New post loaded!',
        likes: 0,
        comments: 0,
      };
      setPosts((prev) => [...prev, newPost]);
      setLoadingMore(false);
    }, 1500);
  }, [loadingMore, posts.length]);

  const renderPost = ({ item }: { item: Post }) => {
    const liked = likes[item.id];
    const textColor = theme === 'dark' ? '#eee' : '#111';

    return (
      <View style={[styles.postContainer, theme === 'dark' && styles.postContainerDark]}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={[styles.username, { color: textColor }]}>{item.username}</Text>
            <Text style={[styles.time, { color: textColor }]}>{item.time}</Text>
          </View>
        </View>
        <Text style={[styles.caption, { color: textColor }]}>{item.caption}</Text>
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.actionButton}>
            <Text style={{ color: liked ? '#e74c3c' : textColor }}>{liked ? '❤️' : '🤍'} Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={{ color: textColor }}>💬 Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleAddPost = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
    } else {
      navigation.navigate('AddPost'); // Replace with your actual post screen
    }
  };

  const handleLoginRedirect = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="large" color="#3498db" /> : null
        }
      />

      <TouchableOpacity onPress={handleAddPost} style={styles.fab}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.socialModal}>
            <Text style={styles.socialModalTitle}>Login Required</Text>
            <Text style={styles.socialModalText}>
              You need to be logged in to add a post.
            </Text>
            <View style={styles.socialModalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.socialModalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLoginRedirect}
                style={[styles.socialModalButton, styles.loginButton]}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  containerDark: { backgroundColor: '#0a0a0a' },

  postContainer: {
    backgroundColor: '#f5f5f5',
    margin: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  postContainerDark: {
    backgroundColor: '#1c1c1c',
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  username: { fontWeight: 'bold', fontSize: 16 },
  time: { fontSize: 12, color: '#666' },

  caption: { marginBottom: 12, fontSize: 14 },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2ecc71',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 28,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  socialModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  socialModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  socialModalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialModalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
