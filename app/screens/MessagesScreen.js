import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";
import colors from "../config/colors";

const initialMessages = [
  {
    id: 1,
    title: "Nice couch",
    description:
      "Hey Drew, I was very interested in the couch you had listed recently. When is a good time to come see it?",
    image: require("../assets/seller1.jpg"),
  },
  {
    id: 2,
    title: "$25 for the black sweatshirt?",
    description: "Hit me up if so",
    image: require("../assets/seller2.jpg"),
  },
  {
    id: 3,
    title: "Still have the lava lamp?",
    description: "I'll go for $10 for it",
    image: require("../assets/seller3.jpg"),
  },
  {
    id: 4,
    title: "I like the table",
    description: "Any wiggle room on it? I can go $40. Will come to you",
    image: require("../assets/seller4.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("msg selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          ></ListItem>
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() =>
          setMessages([
            {
              id: 4,
              title: "I like the table",
              description:
                "Any wiggle room on it? I can go $40. Will come to you",
              image: require("../assets/seller4.jpg"),
            },
            {
              id: 5,
              title: "Still have the desk?",
              description:
                "Saw your post from a few days ago. Wanted to know if you still have it?",
              image: require("../assets/seller5.jpg"),
            },
          ])
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
