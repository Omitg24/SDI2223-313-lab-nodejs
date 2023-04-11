module.exports = {
    mongoClient: null,
    app: null,
    init: function (app, mongoClient) {
        this. mongoClient= mongoClient;
        this.app = app;
    },
    getSongsPg: async function (filter, options, page) {
        try {
            const limit = 4;
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'songs';
            const songsCollection = database.collection(collectionName);
            const songsCollectionCount = await songsCollection.count();
            const cursor = songsCollection.find(filter, options).skip((page - 1) * limit).limit(limit)
            const songs = await cursor.toArray();
            const result = {songs: songs, total: songsCollectionCount};
            return result;
        } catch (error) {
            throw (error);
        }
    },
    getSongs: async function (filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'songs';
            const songsCollection = database.collection(collectionName);
            const songs = await songsCollection.find(filter, options).toArray();
            return songs;
        } catch (error) {
            throw (error);
        }
    },
    findSong: async function (filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'songs';
            const songsCollection = database.collection(collectionName);
            const song = await songsCollection.findOne(filter, options);
            return song;
        } catch (error) {
            throw (error);
        }
    },
    deleteSong: async function (filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'songs';
            const songsCollection = database.collection(collectionName);
            const result = await songsCollection.deleteOne(filter, options);
            return result;
        } catch (error) {
            throw (error);
        }
    },
    updateSong: async function(newSong, filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'songs';
            const songsCollection = database.collection(collectionName);
            const result = await songsCollection.updateOne(filter, {$set: newSong}, options);
            return result;
        } catch (error) {
            throw (error);
        }
    },
    insertSong: function (song, callbackFunction) {
        this.mongoClient.connect(this.app.get('connectionStrings'), function (err, dbClient) {
            if (err) {
                callbackFunction(null)
            } else {
                const database = dbClient.db("musicStore");
                const collectionName = 'songs';
                const songsCollection = database.collection(collectionName);
                songsCollection.insertOne(song)
                    .then(result => callbackFunction(result.insertedId))
                    .then(() => dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            }
        });
    },
    buySong: function (shop, callbackFunction) {
        this.mongoClient.connect(this.app.get('connectionStrings'), function (err, dbClient) {
            if (err) {
                callbackFunction(null)
            } else {
                const database = dbClient.db("musicStore");
                const collectionName = 'purchases';
                const purchasesCollection = database.collection(collectionName);
                purchasesCollection.insertOne(shop)
                    .then(result => callbackFunction(result.insertedId))
                    .then(() => dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            }
        });
    },
    getPurchases: async function (filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'purchases';
            const purchasesCollection = database.collection(collectionName);
            const purchases = await purchasesCollection.find(filter, options).toArray();
            return purchases;
        } catch (error) {
            throw (error);
        }
    },
};