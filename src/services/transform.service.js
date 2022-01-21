export class TransformService {
    static fbObjectToArray(fbData) {
        return fbData === null
            ? null
            : Object.keys(fbData).map((key) => {
                  const item = fbData[key];
                  item.id = key;
                  return item;
              });
    }
}
