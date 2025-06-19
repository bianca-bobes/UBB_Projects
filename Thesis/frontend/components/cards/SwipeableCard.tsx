import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Trash, PencilSimple } from 'phosphor-react-native';
import { theme } from '../../styles/theme';

interface Props {
  content: string;
  date?: string;
  onEdit: () => void;
  onDelete: () => void;
  onPress?: () => void;
}

export default function SwipeableCard({ content, date, onEdit, onDelete, onPress }: Props) {
  const renderRightActions = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <PencilSimple size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Trash size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        {date && <Text style={styles.date}>{date}</Text>}
        <Text style={styles.text}>{content}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.galaxyIndigo,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  text: {
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
    fontFamily: theme.font.body,
  },
  date: {
    fontSize: theme.font.size.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  editBtn: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  deleteBtn: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
});
