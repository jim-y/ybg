import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>YBG</Text>
          <Text accessibilityRole="header" style={styles.title}>
            Your Beautiful Garden
          </Text>
          <Text style={styles.subtitle}>A little care. A garden to remember.</Text>
          <View style={styles.card}>
            <Text accessibilityRole="header" style={styles.cardTitle}>
              Room for something beautiful
            </Text>
            <Text style={styles.body}>
              Your garden starts here. Plant photos, care notes, and watering
              reminders are coming next.
            </Text>
          </View>
          <Text style={styles.footnote}>
            Built to keep your garden close, even when you are offline.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7EE' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 28, gap: 20, maxWidth: 620, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#3D6045', fontSize: 16, fontWeight: '700', letterSpacing: 4 },
  title: { color: '#203C2A', fontSize: 40, fontWeight: '700' },
  subtitle: { color: '#526555', fontSize: 18, lineHeight: 28 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, gap: 12 },
  cardTitle: { color: '#203C2A', fontSize: 22, fontWeight: '600' },
  body: { color: '#526555', fontSize: 16, lineHeight: 25 },
  footnote: { color: '#526555', fontSize: 14, lineHeight: 22 },
});
