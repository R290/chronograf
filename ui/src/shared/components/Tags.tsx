import React, {PureComponent, FunctionComponent} from 'react'
import TagsAddButton from 'src/shared/components/TagsAddButton'
import ConfirmButton from 'src/shared/components/ConfirmButton'
import uuid from 'uuid'
import {ErrorHandling} from 'src/shared/decorators/errors'

interface Item {
  text?: string
  name?: string
}

interface TagsProps {
  tags: Item[]
  confirmText?: string
  onDeleteTag?: (item: Item) => void
  addMenuItems?: Item[]
  addMenuChoose?: (item: Item) => void
}

const Tags: FunctionComponent<TagsProps> = ({
  tags,
  onDeleteTag,
  addMenuItems,
  addMenuChoose,
  confirmText,
}) => {
  return (
    <div className="input-tag-list">
      {tags.map(item => {
        return (
          <Tag
            key={uuid.v4()}
            item={item}
            onDelete={onDeleteTag}
            confirmText={confirmText}
            testId={item.text || item.name || item}
          />
        )
      })}
      {addMenuItems && addMenuItems.length && addMenuChoose ? (
        <TagsAddButton items={addMenuItems} onChoose={addMenuChoose} />
      ) : null}
    </div>
  )
}

interface TagProps {
  confirmText?: string
  item: Item
  onDelete: (item: Item) => void
  testId?: Item
}

@ErrorHandling
class Tag extends PureComponent<TagProps> {
  public static defaultProps: Partial<TagProps> = {
    confirmText: 'Delete',
  }

  public render() {
    const {item, confirmText, testId} = this.props
    return (
      <span key={uuid.v4()} className="input-tag--item" data-test={`${testId}-tag--item`}>
        <span>{item.text || item.name || item}</span>
        <ConfirmButton
          icon="remove"
          size="btn-xs"
          square={true}
          confirmText={confirmText}
          customClass="input-tag--remove"
          confirmAction={this.handleClickDelete(item)}
          testId="delete-tag--button"
        />
      </span>
    )
  }

  private handleClickDelete = item => () => {
    this.props.onDelete(item)
  }
}

export default Tags
